import SignInForm from "./sign-in-form";
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (data) {
    redirect('/dashboard')
  }

  return <SignInForm />;
}