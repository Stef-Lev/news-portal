// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest, res: NextResponse) {
//   const cookie = req.cookies.get("STEF");
//   console.log("COOKIE=", cookie);
//   if (req.nextUrl.pathname.startsWith("/unauth")) return NextResponse.next();
//   if (cookie && cookie === "stefanosleventis") {
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL("/unauth", req.url));
//   }
// }

export async function middleware(req: NextRequest, res: NextResponse) {
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
