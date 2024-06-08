'use client'

import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const response = await fetch('/api/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Redirect to the login page or home page after sign out
        router.push('/login');
      } else {
        // Handle error response
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('An error occurred while signing out', error);
    }
  };

  return <button onClick={signOut}>Sign Out</button>;
};

export default SignOutButton;
