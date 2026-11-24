import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/server/access";

export async function POST(req: Request) {
  (await cookies()).delete(ACCESS_COOKIE);
  return NextResponse.redirect(new URL("/", req.url), 303);
}
