import "server-only";
import crypto from "node:crypto";
import path from "node:path";
import { book, business, formatINR } from "@/content/book";
import type { Order } from "./orders";

// The book PDF is sold as a 24-hour signed link: "<orderId>.<expiresAtSeconds>.<hmac>".
// The file lives outside public/ so it can only be fetched through /api/download.

export const DOWNLOAD_HOURS = 24;
export const bookPdfPath = () => path.resolve(process.cwd(), process.env.BOOK_PDF_PATH ?? "private/ai-blueprint.pdf");

function sign(payload: string) {
  const s = process.env.ACCESS_SECRET;
  if (!s) throw new Error("ACCESS_SECRET is not set (see .env.local)");
  return crypto.createHmac("sha256", s).update(`download:${payload}`).digest("base64url");
}

// The link runs for 24 hours from the payment, so the order page and the email show the same expiry.
export function downloadExpiry(order: Order) {
  return new Date(new Date(order.paidAt ?? order.createdAt).getTime() + DOWNLOAD_HOURS * 3600_000);
}

export function downloadUrl(order: Order, origin: string) {
  const payload = `${order.id}.${Math.floor(downloadExpiry(order).getTime() / 1000)}`;
  return `${origin}/api/download?t=${encodeURIComponent(`${payload}.${sign(payload)}`)}`;
}

// The link for the order page, or undefined once the 24 hours are over.
export function activeDownload(order: Order, origin: string) {
  const expires = downloadExpiry(order);
  return expires.getTime() > Date.now() ? { url: downloadUrl(order, origin), expires: expires.toISOString(), emailed: !!order.downloadEmailedAt } : undefined;
}

export function readDownloadToken(token: string): { orderId: string; expired: boolean } | null {
  const [orderId, exp, sig] = token.split(".");
  if (!orderId || !exp || !sig) return null;
  const expected = sign(`${orderId}.${exp}`);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  return { orderId, expired: Date.now() / 1000 > Number(exp) };
}

const fmt = (d: Date) => d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";

// Sends the download link by email through Resend (RESEND_API_KEY, MAIL_FROM).
// Without a key it only logs the link, which is what local testing uses.
export async function emailDownloadLink(order: Order, origin: string) {
  const url = downloadUrl(order, origin);
  const until = fmt(downloadExpiry(order));
  const subject = `Your ${book.title} download (order ${order.id})`;
  const text = [
    `Hi ${order.name.split(" ")[0]},`,
    "",
    `Thank you for buying ${book.title} (${formatINR(order.amountPaise)}). Download your PDF here:`,
    url,
    "",
    `The link works until ${until}. Save the file to your device before then.`,
    `You can also keep reading online: ${origin}/read/1`,
    "",
    `Order ID: ${order.id}`,
    `Questions? Reply to this email or write to ${business.email}.`,
    "",
    business.brand,
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1d2131;max-width:520px">
<p>Hi ${esc(order.name.split(" ")[0])},</p>
<p>Thank you for buying <b>${esc(book.title)}</b> (${formatINR(order.amountPaise)}).</p>
<p><a href="${url}" style="display:inline-block;background:#1f2a5c;color:#f7f5ef;padding:12px 22px;text-decoration:none;font-weight:600">Download the PDF</a></p>
<p>The link works until <b>${until}</b>. Save the file to your device before then.</p>
<p>You can also keep reading online: <a href="${origin}/read/1">${origin}/read/1</a></p>
<p style="color:#686c7b;font-size:13px">Order ID: ${order.id}<br>Questions? Reply to this email or write to ${business.email}.<br>${business.brand}, a brand of ${business.legalName}</p>
</div>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[download] RESEND_API_KEY not set, email not sent. ${order.email} would get: ${url}`);
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? `${business.brand} <${business.email}>`,
      to: [order.email],
      reply_to: business.email,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    console.error("[download] email failed", order.id, res.status, await res.text());
    return false;
  }
  return true;
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}
