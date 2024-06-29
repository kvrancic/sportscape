import React from 'react';
import ProfileSetup from '@/components/ProfileSetup'; 
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
/*import {StepperMain} from './StepperMain'*/

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log('Podaci korisnika: ', data) 
  if (error || !data?.user) {
    console.error(error)
    console.log(data)
    //redirect('/login')
  }

  return (
    <div>
      
        <h1>Complete Your Profile</h1>
        <p>Please complete your profile setup to start using the platform.</p>
        
        {/* <StepperMain /> */}


        {/* {<ProfileSetup /> } */}

    </div>
  );
}

