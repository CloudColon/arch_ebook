import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// A small JSON-file order store. Fine for launch traffic on a single server;
// swap for Postgres or SQLite when there is more than one instance.

export type OrderStatus = "pending" | "paid" | "failed";

export type Order = {
  id: string;
  bookId: string;
  amountPaise: number;
  name: string;
  email: string;
  phone: string;
  status: OrderStatus;
  provider: string;
  providerRef?: string;
  providerTxnRef?: string; // ICICI TxnRefNo of the latest payment attempt
  createdAt: string;
  paidAt?: string;
  termsAcceptedAt?: string; // when the buyer ticked the checkout checkbox
  downloadEmailedAt?: string; // when the 24-hour PDF link was emailed
  termsVersion?: string; // the terms' "last updated" date they agreed to
};

const FILE = path.join(process.cwd(), "data", "orders.json");
let queue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Order[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Order[];
  } catch {
    return [];
  }
}

async function writeAll(orders: Order[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(orders, null, 2));
  await fs.rename(tmp, FILE);
}

// Serialise writes inside this process so two callbacks cannot overwrite each other.
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.catch(() => undefined);
  return next;
}

export function newOrderId() {
  // Short, readable, hard to guess: KB-7F3K9Q2M
  return "KB-" + crypto.randomBytes(6).toString("base64url").toUpperCase().replace(/[^A-Z0-9]/g, "X").slice(0, 8);
}

export async function createOrder(o: Omit<Order, "id" | "status" | "createdAt">) {
  return locked(async () => {
    const orders = await readAll();
    const order: Order = { ...o, id: newOrderId(), status: "pending", createdAt: new Date().toISOString() };
    orders.push(order);
    await writeAll(orders);
    return order;
  });
}

export async function getOrder(id: string) {
  return (await readAll()).find((o) => o.id === id);
}

export async function updateOrder(id: string, patch: Partial<Order>) {
  return locked(async () => {
    const orders = await readAll();
    const i = orders.findIndex((o) => o.id === id);
    if (i === -1) return undefined;
    orders[i] = { ...orders[i], ...patch };
    await writeAll(orders);
    return orders[i];
  });
}
