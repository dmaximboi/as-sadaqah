import { getAuth, isAuthConfigured } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

async function handle(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: "Authentication is not configured yet." }, { status: 503 });
  }
  const handlers = getAuth().handler();
  return request.method === "GET" ? handlers.GET(request) : handlers.POST(request);
}
export const GET = handle;
export const POST = handle;
