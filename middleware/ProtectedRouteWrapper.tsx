'use client';

import LoaderOntop from '@/components/LoaderOnTop';
import useUser from '@/context/UserContext';
import useLocalStorageManager from '@/hooks/useLocalStorageManager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { addUserInfo } = useUser();

  const { getItem } = useLocalStorageManager();

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getItem('accessToken')}`
            },
        })

        if (!result.ok) {
          router.replace('/signin');
        } else {

          const body = await result.json();

          addUserInfo(body.data);

          setLoading(false);
        }
        
      } catch (error) {
        router.replace('/signin');
      }
    }

    fetchUserData();
  }, []);

  if (loading) return <LoaderOntop />;
  return <>{children}</>;
}

export default ProtectedRouteWrapper;