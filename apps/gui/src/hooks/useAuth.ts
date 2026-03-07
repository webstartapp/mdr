'use client';

import { useState, useEffect, useCallback } from 'react';

import { getMyself, signOut } from '@/gen/mdr';
import type { User } from '@/gen/mdr.schemas';
import { LoggerService } from '@/lib/logger';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async (): Promise<void> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await getMyself();
      if (response && response.data) {
        setUser(response.data);
      }
    } catch (error: unknown) {
      LoggerService.error('Failed to fetch user', error);
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const logout = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    setUser(null);
    try {
      await signOut();
    } catch {
      // Signout error is suppressed per requirements
    }
  };

  return { user, isLoading, logout, refreshUser: fetchUser };
};
