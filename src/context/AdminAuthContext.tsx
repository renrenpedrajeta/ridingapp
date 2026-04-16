import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { MOCK_ADMINS } from '../../src_refactored/data/mockData';

interface AdminAuthContextType {
  admin: User | null;
  isAdminLoggedIn: boolean;
  isLoading: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminRegister: (adminData: Partial<User>) => Promise<void>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      const parsedAdmin = JSON.parse(savedAdmin);
      if (parsedAdmin.role === 'admin') {
        setAdmin(parsedAdmin);
        setIsAdminLoggedIn(true);
      } else {
        localStorage.removeItem('admin');
      }
    }
    setIsLoading(false);
  }, []);

  const adminLogin = async (email: string, password: string) => {
    const foundAdmin = MOCK_ADMINS.find(
      (a) => a.email === email && a.password === password && a.role === 'admin'
    );

    if (!foundAdmin) {
      throw new Error('Invalid admin email or password');
    }

    const { password: _, ...adminWithoutPassword } = foundAdmin;
    const mockAdmin: User = adminWithoutPassword;

    setAdmin(mockAdmin);
    setIsAdminLoggedIn(true);
    localStorage.setItem('admin', JSON.stringify(mockAdmin));
  };

  const adminRegister = async (adminData: Partial<User>) => {
    if (adminData.role !== 'admin') {
      throw new Error('Invalid role for admin registration');
    }

    const emailExists = MOCK_ADMINS.some((a: User) => a.email === adminData.email);
    if (emailExists) {
      throw new Error('Email already registered as admin');
    }

    const newAdmin: User = {
      id: `admin-${Date.now()}`,
      name: adminData.name || '',
      email: adminData.email || '',
      phone: adminData.phone || '',
      role: 'admin',
      token: `admin-token-${Date.now()}`,
    };

    MOCK_ADMINS.push(newAdmin as User & { password: string });
    setAdmin(newAdmin);
    setIsAdminLoggedIn(true);
    localStorage.setItem('admin', JSON.stringify(newAdmin));
  };

  const adminLogout = () => {
    setAdmin(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('admin');
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, isAdminLoggedIn, isLoading, adminLogin, adminRegister, adminLogout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    return {
      admin: null,
      isAdminLoggedIn: false,
      isLoading: true,
      adminLogin: async () => { throw new Error('AdminAuthProvider not found'); },
      adminRegister: async () => { throw new Error('AdminAuthProvider not found'); },
      adminLogout: () => {},
    };
  }
  return context;
};