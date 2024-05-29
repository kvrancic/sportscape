import { updateSession } from '@/utils/supabase/middleware'

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'


export async function middleware(request) {
  await updateSession(request);
  
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /about
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    console.log(data)
    if (error || !data?.user) {
      return NextResponse.redirect(new URL("/login", request.url))
    } 
  }

  /* if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /dashboard


    return await updateSession(request)
  } */
}

export const config = {  
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',

  ],
}