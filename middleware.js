import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware( request ) {
  
  const token = await request ? request.cookies.get("token") : null;
  
  if( token && request.nextUrl.pathname === "/login" ) {
    const url = request.nextUrl.clone()
    url.pathname = '/';
    return NextResponse.rewrite(url)
  }
  if ( !token ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login';
    
    return NextResponse.rewrite(url)
  }
  if ( token ) {
    return NextResponse.next();
  }
 
    
}
export const config = {
  matcher: ['/', '/browse/my-list' , '/video/:videoId', '/login'],
}
