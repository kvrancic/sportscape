import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function WelcomePage() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect('/welcome');
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('type')
    .eq('id', userData.user.id)
    .single();

  if (profileError || profileData?.type === null) {
    redirect('/finishprofile');
  }

  redirect('/dashboard');

  return <p>Hello {userData.user.email}</p>;
}
