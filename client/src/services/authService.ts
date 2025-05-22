'use client';

import { UserData } from '@/types/auth';
import { safeFetch, processApiError } from '@/utils/api';

// Use a consistent API URL that respects CORS
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const USER_DATA_KEY = 'userData';

export const AuthService = {
  // Login user
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await safeFetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      sessionStorage.setItem('accessToken', data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
      
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  },
  
  // Register new user
  register: async (userData: Partial<UserData>, password: string): Promise<boolean> => {
    try {
      const data = await safeFetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: password
        }),
        credentials: 'include',
      });

      sessionStorage.setItem('accessToken', data.token);
      
      // Store user data with the additional profile information
      const userToStore = {
        id: data.user?.id || 'temp-id-' + Date.now(),
        email: userData.email,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        initials: userData.initials || '',
        createdAt: data.user?.createdAt || new Date().toISOString()
      };
      
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userToStore));
      
      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  },
  
  // Logout user
  logout: (): void => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem(USER_DATA_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!sessionStorage.getItem('accessToken');
  },
  
  // Get auth token
  getToken: (): string | null => {
    return sessionStorage.getItem('accessToken');
  },
  
  // Get current user data
  getCurrentUser: (): UserData | null => {
    if (!AuthService.isAuthenticated()) {
      return null;
    }
    
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (!userData) {
      return null;
    }
    
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },
  
  // Update user data
  updateUserData: async (updates: Partial<UserData>): Promise<boolean> => {
    if (!AuthService.isAuthenticated()) {
      return false;
    }
    
    try {
      const token = AuthService.getToken();
      if (!token) return false;

      const data = await safeFetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      localStorage.setItem(USER_DATA_KEY, JSON.stringify({
        ...AuthService.getCurrentUser(),
        ...data
      }));
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  },
};
