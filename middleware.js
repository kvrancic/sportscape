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

  const pathname = nextUrl.pathname;

  if (!user) {
    console.log('no user');
    if (pathname !== '/welcome') {
      const url = new URL('/welcome', req.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from('profile')
    .select('type')
    .eq('id', user.id)
    .single();

  console.log(profile);

  // Redirect to /finishprofile if user is logged in but has no role
  if (!profile || profile.type === null) {
    if (pathname !== '/finishprofile') {
      const url = new URL('/finishprofile', req.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

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
    '/vendor/:path*',
    '/welcome',
    '/finishprofile'
  ], // Apply middleware to these paths
};
