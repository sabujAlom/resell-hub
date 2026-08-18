import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// Protect every dashboard page before it is rendered.
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
