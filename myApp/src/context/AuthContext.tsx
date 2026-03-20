// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { MOCK_USERS, MOCK_RIDERS, MOCK_ADMINS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const login = async (email: string, password: string) => {
    // Check against mock users (users, riders, and admins)
    const allMockUsers = [...MOCK_USERS, ...MOCK_RIDERS, ...MOCK_ADMINS];
    const foundUser = allMockUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Remove password from the stored user object for security
    const { password: _, ...userWithoutPassword } = foundUser;
    const mockUser: User = userWithoutPassword;
    
    setUser(mockUser);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (userData: Partial<User>) => {
    // Check if email already exists in mock data
    const allMockUsers = [...MOCK_USERS, ...MOCK_RIDERS, ...MOCK_ADMINS];
    const emailExists = allMockUsers.some(u => u.email === userData.email);
    
    if (emailExists) {
      throw new Error('Email already registered');
    }

    // Create new mock user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'user',
      token: `mock-token-${Date.now()}`,
      verificationStatus: userData.role === 'rider' ? 'pending' : undefined,
      vehicle: userData.vehicle,
      licensePlate: userData.licensePlate,
      licenseNumber: userData.licenseNumber,
      bankAccount: userData.bankAccount,
      bankName: userData.bankName,
    };
    
    // In a real app, you would save this to a database
    // For now, just add to the appropriate mock array
    if (userData.role === 'rider') {
      MOCK_RIDERS.push({ ...newUser, password: 'Password@123' } as any);
    } else {
      MOCK_USERS.push({ ...newUser, password: 'Password@123' } as any);
    }
    
    setUser(newUser);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('user');
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isGuest, login, register, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};