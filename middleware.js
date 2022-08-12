// import { NextResponse } from 'next/server';
// import { verifyToken } from './lib/utils'


// // This function can be marked `async` if using `await` inside
// export async function middleware( request, ev ) {
//   const token = await request ? request.cookies.get("token") : null;
//   const userId = await verifyToken();
//     console.log(userId);
//   if( token && userId && request.nextUrl.pathname === "/login" ) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/';
//     return NextResponse.redirect(url)
//   }
//   if ( (!token || !userId) && request.nextUrl.pathname !== "/login" ) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/login';
//     return NextResponse.redirect(url)
//   }
//   if ( userId ) {
//     return NextResponse.next();
//   }
 
    
// }
// export const config = {
//   matcher: ['/', '/browse/my-list' , '/video/:videoId'],
// }

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";

export async function middleware(req, ev) {
  const token = req ? req.cookies.get("token") : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/login") ||
    userId ||
    pathname.includes("/static")
  ) {
    return NextResponse.next();
  }

  if ((!token || !userId) && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}