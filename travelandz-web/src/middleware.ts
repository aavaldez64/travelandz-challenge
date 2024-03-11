import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth.config";

export async function middleware(request: NextRequest) {
  const url = new URL(request.nextUrl);

  const session = await auth();
  if (session) {
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (url.pathname !== "/" && url.pathname !== "/register")
      return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
