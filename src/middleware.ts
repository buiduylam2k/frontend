import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next/image")) {
    const url = `${process.env.NEXT_PUBLIC_URL || ""}${req.nextUrl.searchParams.get("url")}`

    console.log("====url", url)

    return NextResponse.rewrite(new URL(url))
  }

  return NextResponse.next()
}
