import React from 'react';
import Welcome from './Welcome';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();

  // Fetch the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log('User Data:', userData);
  //console.log('User Error:', userError);

  if (userData?.user) {
    // Fetch the user's profile
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .select('type')
      .eq('id', userData.user.id)
      .single();

    console.log('Profile Data:', profileData);
    console.log('Profile Error:', profileError);

    if (profileError || profileData?.type === null) {
      console.log('Profile type is null, redirecting to /finishprofile');
      redirect('/finishprofile');
    }
  }

  return <Welcome />;
}
