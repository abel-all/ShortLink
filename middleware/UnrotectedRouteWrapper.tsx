'use client';

import LoaderOntop from '@/components/LoaderOnTop';
import useLocalStorageManager from '@/hooks/useLocalStorageManager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UnprotectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        } else {
          router.replace('/home');
        }
        
      } catch (error) {
        setLoading(false);
      }
    }

    fetchUserData();

  }, []);

  if (loading) return <LoaderOntop />;
  return <>{children}</>;
}

export default UnprotectedRouteWrapper;