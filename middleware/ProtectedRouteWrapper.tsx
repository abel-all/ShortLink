'use client';

import useLocalStorageManager from '@/hooks/useLocalStorageManager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { getItem } = useLocalStorageManager();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getItem('accessToken')}`
        },
    })
      .then(async (r) => await r.json())
      .then(body => {
        if (body.message !== "OK") router.replace('/signin');
        else {
          console.log(body);
          setLoading(false);
        }
      })
      .catch(() => router.replace('/signin'))
  }, []);

  if (loading) return <div>Loading…</div>;
  return <>{children}</>;
}

export default ProtectedRouteWrapper;