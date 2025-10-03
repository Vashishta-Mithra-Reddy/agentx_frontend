"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
}


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
      router.push(`/${res.data.role}/dashboard`);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};