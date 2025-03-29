import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // In a real app, you would verify a JWT token or session cookie
  // For this demo, we'll use a simple localStorage check in the client component

  // Only apply to /admin/dashboard routes
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    // In a real app, you would check for a valid session cookie here
    // For now, we'll just let the client-side check handle it
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

