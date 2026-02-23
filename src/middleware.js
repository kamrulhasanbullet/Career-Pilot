import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const userOnlyRoutes = ["/user-dashboard", "/resume"];
const companyOnlyRoutes = ["/my-jobs", "/post-job"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;

  // Not logged in → login page e pathao
  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url),
    );
  }

  const role = token?.role; 

  // User route e company gele block
  const isUserRoute = userOnlyRoutes.some((r) => reqPath.startsWith(r));
  if (isUserRoute && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Company route e user gele block
  const isCompanyRoute = companyOnlyRoutes.some((r) => reqPath.startsWith(r));
  if (isCompanyRoute && role !== "company") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user-dashboard/:path*",
    "/resume/:path*",
    "/my-jobs/:path*",
    "/post-job/:path*",
  ],
};
