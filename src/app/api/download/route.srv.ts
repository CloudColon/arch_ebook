import { promises as fs } from "node:fs";
import { NextResponse } from "next/server";
import { getOrder } from "@/server/orders";
import { bookPdfPath, readDownloadToken } from "@/server/download";

// GET /api/download?t=<token>: the book PDF for a paid order, while its 24-hour link is valid.
export async function GET(req: Request) {
  const token = readDownloadToken(new URL(req.url).searchParams.get("t") ?? "");
  if (!token) return new NextResponse("This download link is not valid.", { status: 403 });
  if (token.expired) {
    return new NextResponse("This download link has expired. Links work for 24 hours after payment. Write to us with your order ID for a new one.", {
      status: 410,
    });
  }
  const order = await getOrder(token.orderId);
  if (order?.status !== "paid") return new NextResponse("This order is not paid.", { status: 403 });

  let file: Buffer;
  try {
    file = await fs.readFile(bookPdfPath());
  } catch {
    console.error("[download] book PDF missing at", bookPdfPath());
    return new NextResponse("The download is not available right now. Please try again later.", { status: 503 });
  }
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": 'attachment; filename="AI-Blueprint.pdf"',
      "cache-control": "private, no-store",
    },
  });
}
