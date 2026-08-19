import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// Guard every dashboard route before it is rendered.
// Proxy always runs on the Node.js runtime, which Better Auth's
// MongoDB adapter requires.
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
