import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

interface User {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, { email, password }, { withCredentials: true });
      setUser(res.data.user);
      toast.success('Logged in successfully');
      router.push(`/${res.data.role}/dashboard`);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return { user, loading, login, logout };
};

export default useAuth;