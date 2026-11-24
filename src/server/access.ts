import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getOrder } from "./orders";

// Reading access is an httpOnly cookie holding "<orderId>.<hmac>". The order must still be paid.

export const ACCESS_COOKIE = "kb_access";

function secret() {
  const s = process.env.ACCESS_SECRET;
  if (!s) throw new Error("ACCESS_SECRET is not set (see .env.local)");
  return s;
}

function sign(orderId: string) {
  return crypto.createHmac("sha256", secret()).update(orderId).digest("base64url");
}

export function accessToken(orderId: string) {
  return `${orderId}.${sign(orderId)}`;
}

export const accessCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 365 * 5,
};

export async function grantAccess(orderId: string) {
  (await cookies()).set(ACCESS_COOKIE, accessToken(orderId), accessCookieOptions);
}

export async function readerOrder() {
  const raw = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!raw) return null;
  const dot = raw.lastIndexOf(".");
  const id = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  const expected = sign(id);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const order = await getOrder(id);
  return order?.status === "paid" ? order : null;
}
