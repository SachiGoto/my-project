import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token');

  if (currentUser) {
    if(request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup')){
      console.log("Redirecting to home because user is logged in");
      return Response.redirect(new URL('/', request.url));
    }
    
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/login') &&  !request.nextUrl.pathname.startsWith('/signup')) {
    console.log("Redirecting to login because user is not logged in");
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}


