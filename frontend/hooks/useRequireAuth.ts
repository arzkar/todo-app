import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return null;
};

export default useRequireAuth;
