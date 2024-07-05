// pages/private-page.js
import SignUpForm from "./sign-up-form";
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import RandomImage from '@/components/RandomImage';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();
  if (user.id) {
    redirect('/dashboard');
  } else {
    return (
      <div className="flex h-screen w-full">
        <div className="hidden xl:flex flex-1">
          <RandomImage />
        </div>
        <div className="flex justify-center items-center w-full xl:w-1/2 p-6 bg-white">
          <SignUpForm />
        </div>
      </div>
    );
  }
}
