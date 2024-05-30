import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, useUser } from '@supabase/auth-helpers-react';

export default async function ProtectedRoute ({ children }) {
  const { data : user, error } = await supabase.auth.getUser()
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return children;
};


