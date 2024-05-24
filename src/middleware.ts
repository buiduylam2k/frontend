import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next/image")) {
    return NextResponse.next()
  }

  return NextResponse.next()
}
