"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCodeSelect from './CountryCodeSelect';
import { toast } from 'sonner';

interface Agent {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  active: boolean;
}

interface EditAgentFormProps {
  agent: Agent;
  onAgentUpdated: () => void;
  onClose: () => void;
}

const EditAgentForm: React.FC<EditAgentFormProps> = ({ agent, onAgentUpdated, onClose }) => {
  const [name, setName] = useState(agent.name);
  const [email, setEmail] = useState(agent.email);
  const [mobileNumber, setMobileNumber] = useState(agent.mobileNumber);
  const [countryCode, setCountryCode] = useState(agent.countryCode);
  const [active, setActive] = useState(agent.active);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(agent.name);
    setEmail(agent.email);
    setMobileNumber(agent.mobileNumber);
    setCountryCode(agent.countryCode);
    setActive(agent.active);
  }, [agent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/agent/update/${agent._id}`, {
        name, email, mobileNumber, countryCode, active
      }, { withCredentials: true });
      toast.success('Agent updated successfully!');
      onAgentUpdated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update agent');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full font-outfit">
      <div className="px-6 pt-6 pb-6 rounded-xl w-full max-w-md bg-background">
        <h2 className="text-3xl mb-12 text-center">Edit Agent</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col'>
          <div className="mb-4 w-full">
            <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              placeholder="Agent Name"
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
              className="w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              placeholder="agent@example.com"
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
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </div>
            <div className="mb-4 w-3/5">
              <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                type="number"
                id="mobileNumber"
                className="w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
                placeholder="9876543210"
                value={mobileNumber}
                maxLength={10}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-500 pl-2 text-sm font-bold mb-2" htmlFor="active">
              Active
            </label>
            <input
              type="checkbox"
              id="active"
              className="ml-2"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              disabled={isSubmitting || !name || !email || !mobileNumber || !countryCode}
              className="w-full bg-foreground/80 hover:bg-foreground text-lg text-primary-foreground font-bold py-2 px-6 rounded-xl cursor-pointer focus:outline-none focus:shadow-outline mt-2 transition-all duration-500"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                "Update Agent"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAgentForm;