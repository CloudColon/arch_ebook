// Static demo (GitHub Pages) only: orders and reading access are kept in this browser's localStorage.
// Nothing here is used by the real store, which keeps orders on the server and checks a signed cookie.

import { book } from "@/content/book";

export const DEMO = process.env.NEXT_PUBLIC_DEMO === "1";

export type DemoOrder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  amountPaise: number;
  status: "pending" | "paid" | "failed";
  createdAt: string;
};

const ORDERS = "kb_demo_orders";
const ACCESS = "kb_demo_access";

function all(): DemoOrder[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS) ?? "[]");
  } catch {
    return [];
  }
}
function save(orders: DemoOrder[]) {
  try {
    localStorage.setItem(ORDERS, JSON.stringify(orders));
  } catch {}
}

export function createDemoOrder(buyer: { name: string; email: string; phone: string }) {
  const id = "KB-" + Math.random().toString(36).slice(2, 10).toUpperCase();
  save([...all(), { ...buyer, id, amountPaise: book.pricePaise, status: "pending", createdAt: new Date().toISOString() }]);
  return id;
}

export function getDemoOrder(id: string) {
  return all().find((o) => o.id === id);
}

export function settleDemoOrder(id: string, paid: boolean) {
  save(all().map((o) => (o.id === id && o.status !== "paid" ? { ...o, status: paid ? "paid" : "failed" } : o)));
  if (paid) grant(id);
}

function grant(id: string) {
  try {
    localStorage.setItem(ACCESS, id);
  } catch {}
}

export function demoReader() {
  try {
    const id = localStorage.getItem(ACCESS);
    const o = id ? getDemoOrder(id) : undefined;
    return o?.status === "paid" ? o : null;
  } catch {
    return null;
  }
}

export function restoreDemo(orderId: string, email: string) {
  const o = getDemoOrder(orderId.trim().toUpperCase());
  if (!o || o.status !== "paid" || o.email !== email.trim().toLowerCase()) return false;
  grant(o.id);
  return true;
}

export function lockDemo() {
  try {
    localStorage.removeItem(ACCESS);
  } catch {}
}
