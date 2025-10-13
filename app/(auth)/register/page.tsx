"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {motion} from "framer-motion";
import { useAuth } from '@/context/AuthContext';
import CountryCodeSelect from '@/components/CountryCodeSelect';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, { name, email, password, mobileNumber, countryCode });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center md:bg-foreground/5 dark:bg-background font-outfit">
      <motion.div initial={{y:10,opacity: 0,filter:"blur(5px)"}} animate={{y:0,opacity: 1,filter:"blur(0px)"}} transition={{duration: 0.5,ease:"easeInOut"}} exit={{y:10,opacity: 0,filter:"blur(5px)"}} className="px-12 pt-12 pb-6 rounded-xl w-full max-w-md bg-background">
        <h2 className="text-3xl mb-12 text-center">Register for <Link href="/" className="font-semibold">AgentX</Link></h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col'>
          <div className="mb-4 w-full">
            <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="text-foreground w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              placeholder="Vashishta Mithra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="text-foreground w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              placeholder="vashishta@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center justify-center gap-2 w-full'>

          <div className="mb-4 w-2/5">
            <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="countryCode">
              Code
            </label>
            <CountryCodeSelect
              value={countryCode}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountryCode(e.target.value)}
            />
          </div>

          <div className="mb-4 w-3/5">
            <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              type="number"
              id="mobileNumber"
              className="text-foreground w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              placeholder="9876543210"
              value={mobileNumber}
              maxLength={10}
              onChange={(e) => setMobileNumber(e.target.value)} 
              required
            />
          </div>
          
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="text-foreground w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              disabled={isSubmitting || !name || !email || !password || !mobileNumber || !countryCode}
              className="w-full bg-blue-400 hover:bg-blue-500 text-lg text-white font-bold py-2 px-6 rounded-xl cursor-pointer focus:outline-none focus:shadow-outline mt-2 transition-all duration-500"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
          <div className="text-center mt-6">
            <Link href="/login">
            <p className="text-md text-gray-500 hover:underline">
              Already registered? <span className="text-blue-500">Sign In</span> 
            </p>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
