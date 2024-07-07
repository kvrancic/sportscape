import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(req) {
  const { nextUrl } = req;
  const supabase = createClient();

  // Update session
  await updateSession(req);

  // Get user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log('no user');
    const url = new URL('/welcome', req.url);
    return NextResponse.redirect(url);
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from('profile')
    .select('type')
    .eq('id', user.id)
    .single();

  console.log(profile);

  // Redirect to /finishprofile if user is logged in but has no profile
  if (!profile) {
    const url = new URL('/finishprofile', req.url);
    return NextResponse.redirect(url);
  }

  const pathname = nextUrl.pathname;

  // Redirect users based on their role
  if (pathname === '/dashboard') {
    if (profile.type === 'vendor') {
      const url = new URL('/vendor/dashboard', req.url);
      return NextResponse.redirect(url);
    } else if (profile.type === 'athlete') {
      const url = new URL('/athlete/dashboard', req.url);
      return NextResponse.redirect(url);
    }
  }

  // Protect /athlete/* routes
  if (pathname.startsWith('/athlete')) {
    if (profile.type !== 'athlete') {
      const url = new URL('/welcome', req.url);
      return NextResponse.redirect(url);
    }
  }

  // Protect /vendor/* routes
  if (pathname.startsWith('/vendor')) {
    if (profile.type !== 'vendor') {
      const url = new URL('/welcome', req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/athlete/:path*',
    '/vendor/:path*'
  ], // Apply middleware only to /dashboard and its sub-routes, /athlete and its sub-routes, and /vendor and its sub-routes
};
