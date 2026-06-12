import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isValid = await isValidSessionToken(token);

  if (pathname === "/yonetim/giris") {
    if (isValid) {
      return NextResponse.redirect(new URL("/yonetim", request.url));
    }
    return NextResponse.next();
  }

  if (!isValid) {
    return NextResponse.redirect(new URL("/yonetim/giris", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/yonetim/:path*",
};
