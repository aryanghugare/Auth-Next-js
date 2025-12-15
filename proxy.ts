import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// this is the logic for the middleware
export function proxy(request: NextRequest) {
const path = request.nextUrl.pathname;

const isPublicPath = ['/login', '/signup','/verifyemail'].includes(path);
const token = request.cookies.get('token')?.value || "";

//protecting the public routes
if(isPublicPath && token){
  return NextResponse.redirect(new URL('/profile', request.nextUrl)); // in the tutorial it is '/'  
}


//protecting the private routes
if(!isPublicPath && !token){
  return NextResponse.redirect(new URL('/login', request.nextUrl));
}

}

// this is the path for the middleware
export const config = {
  matcher: [
'/',
'/profile',
'/login',
'/signup',
'/verifyemail',
],
};