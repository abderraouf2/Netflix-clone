import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware( request ) {
  // console.log({ request });
  const token = await request ? request.cookies.get("token") : null;
  console.log({ token });
  if( token && request.nextUrl.pathname === "/login" ) {
    const url = request.nextUrl.clone()
    url.pathname = '/';
    console.log("home page hahahaha");
    return NextResponse.rewrite(url)
  }
  if ( !token ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login';
    console.log("login page hahahaha");
    return NextResponse.rewrite(url)
  }
  if ( token ) {
    console.log("here");
    return NextResponse.next();
  }
 
    
}
export const config = {
  matcher: ['/', '/browse/my-list' , '/video/:videoId', '/login'],
}
