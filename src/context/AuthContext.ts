'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  fullName: string;
  full_name?: string;
  email: string;
  school: string;
  department: string;
  level: string;
  createdAt?: string;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  school: string;
  department: string;
  level: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (userData: SignupData) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem('campulse_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('campulse_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof window === 'undefined') {
          reject(new Error('Window is not defined'));
          return;
        }

        // Check if user exists in localStorage (from signup)
        const usersJson = localStorage.getItem('campulse_users');
        const users: StoredUser[] = usersJson ? JSON.parse(usersJson) : [];
        const foundUser = users.find(u => u.email === email && u.password === password);

        // For testing purposes, also allow a default test user if no users exist
        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('campulse_user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else if (email === 'test@student.com' && password === 'password123') {
          const testUser: User = {
            id: '1',
            fullName: 'Test Student',
            email: 'test@student.com',
            school: 'University of Ilorin',
            department: 'Computer Science',
            level: '300 Level'
          };
          setUser(testUser);
          localStorage.setItem('campulse_user', JSON.stringify(testUser));
          resolve(testUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const signup = async (userData: SignupData): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof window === 'undefined') {
          reject(new Error('Window is not defined'));
          return;
        }

        // Check if email already exists
        const usersJson = localStorage.getItem('campulse_users');
        const users: StoredUser[] = usersJson ? JSON.parse(usersJson) : [];
        const emailExists = users.some(u => u.email === userData.email);

        if (emailExists) {
          reject(new Error('Email already registered'));
          return;
        }

        // Create new user
        const newStoredUser: StoredUser = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date().toISOString()
        };

        // Save to users array
        users.push(newStoredUser);
        localStorage.setItem('campulse_users', JSON.stringify(users));

        // Set as current user (without password)
        const { password: _, ...userWithoutPassword } = newStoredUser;
        setUser(userWithoutPassword);
        localStorage.setItem('campulse_user', JSON.stringify(userWithoutPassword));

        resolve(userWithoutPassword);
      }, 1000);
    });
  };

  const logout = (): void => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('campulse_user');
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
