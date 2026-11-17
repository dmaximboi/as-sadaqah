import { NextRequest, NextResponse } from "next/server";
import { getAuth, isAuthConfigured } from "@/lib/auth/server";

export default function proxy(request: NextRequest) {
  if (!isAuthConfigured()) return NextResponse.next();
  return getAuth().middleware({ loginUrl: "/auth/sign-in" })(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
