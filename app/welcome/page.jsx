import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  /* const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log(data)
  if (error || !data?.user) {
    redirect('/auth/signin')
  } 
 */
  
  return <p>Hello s</p>
}