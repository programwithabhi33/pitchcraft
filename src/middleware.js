import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  const isAuthRoute = nextUrl.pathname.startsWith("/auth")
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard")

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return null
  }

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
}
