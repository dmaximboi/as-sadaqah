import { getAuth, isAuthConfigured } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ path: string }> };

async function handle(request: NextRequest, context: RouteContext) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: "Authentication is not configured yet." }, { status: 503 });
  }
  const handlers = getAuth().handler();
  return request.method === "GET"
    ? handlers.GET(request, context)
    : handlers.POST(request, context);
}

export const GET = handle;
export const POST = handle;
