'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiFetch } from '@/lib/api';

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const stored = localStorage.getItem('auth_user');
    if (token && stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const data = await apiFetch<{ access_token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
    document.cookie = 'has_session=1; path=/';
    setUser(data.user);
  }

  async function register(email: string, password: string) {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_user');
    document.cookie = 'has_session=; path=/; max-age=0';
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
