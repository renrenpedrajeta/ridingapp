// src/context/VendorAuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Vendor {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
  storeAddress?: string;
  storeCategory?: string;
  token?: string;
  rememberMe?: boolean;
}

interface VendorAuthContextType {
  vendor: Vendor | null;
  isVendorLoggedIn: boolean;
  vendorLogin: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  vendorRegister: (vendorData: Vendor) => Promise<void>;
  vendorLogout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const VendorAuthContext = createContext<VendorAuthContextType | undefined>(undefined);

// Mock vendor database
const MOCK_VENDORS: Vendor[] = [
  {
    id: 'vendor-1',
    fullName: 'John Smith',
    businessName: 'Pizza Palace',
    email: 'vendor@pizza.com',
    phone: '+1234567890',
    password: 'Vendor@123',
    storeAddress: '123 Main Street, Downtown',
    storeCategory: 'Italian',
    token: 'vendor-mock-token-1',
  },
  {
    id: 'vendor-2',
    fullName: 'Sarah Johnson',
    businessName: 'Burger Station',
    email: 'vendor@burger.com',
    phone: '+0987654321',
    password: 'Vendor@123',
    storeAddress: '456 Main Street, Downtown',
    storeCategory: 'Fast Food',
    token: 'vendor-mock-token-2',
  },
];

export const VendorAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(false);

  const vendorLogin = async (email: string, password: string, rememberMe: boolean) => {
    // Simulate API call
    const foundVendor = MOCK_VENDORS.find(v => v.email === email && v.password === password);
    
    if (!foundVendor) {
      throw new Error('Invalid email or password');
    }

    const vendorData = { ...foundVendor, rememberMe };
    setVendor(vendorData);
    setIsVendorLoggedIn(true);
    
    if (rememberMe) {
      localStorage.setItem('vendor', JSON.stringify(vendorData));
    } else {
      sessionStorage.setItem('vendor', JSON.stringify(vendorData));
    }
  };

  const vendorRegister = async (vendorData: Vendor) => {
    // Check if email already exists
    const exists = MOCK_VENDORS.some(v => v.email === vendorData.email);
    if (exists) {
      throw new Error('Email already registered');
    }

    // Add new vendor to mock database
    const newVendor: Vendor = {
      ...vendorData,
      id: `vendor-${Date.now()}`,
      token: `vendor-mock-token-${Date.now()}`,
    };

    MOCK_VENDORS.push(newVendor);
    setVendor(newVendor);
    setIsVendorLoggedIn(true);
    
    sessionStorage.setItem('vendor', JSON.stringify(newVendor));
  };

  const vendorLogout = () => {
    setVendor(null);
    setIsVendorLoggedIn(false);
    localStorage.removeItem('vendor');
    sessionStorage.removeItem('vendor');
  };

  const resetPassword = async (email: string) => {
    // Simulate API call - just check if vendor exists
    const foundVendor = MOCK_VENDORS.find(v => v.email === email);
    if (!foundVendor) {
      // For security, don't reveal if email exists or not
      throw new Error('If this email exists, you will receive reset instructions');
    }
    
    // In a real app, this would send a reset email
    console.log(`Password reset email sent to ${email}`);
  };

  useEffect(() => {
    // Check if vendor is saved in localStorage (remember me)
    const savedVendor = localStorage.getItem('vendor');
    if (savedVendor) {
      const vendorData = JSON.parse(savedVendor);
      setVendor(vendorData);
      setIsVendorLoggedIn(true);
      return;
    }

    // Check if vendor is saved in sessionStorage
    const sessionVendor = sessionStorage.getItem('vendor');
    if (sessionVendor) {
      const vendorData = JSON.parse(sessionVendor);
      setVendor(vendorData);
      setIsVendorLoggedIn(true);
    }
  }, []);

  return (
    <VendorAuthContext.Provider
      value={{
        vendor,
        isVendorLoggedIn,
        vendorLogin,
        vendorRegister,
        vendorLogout,
        resetPassword,
      }}
    >
      {children}
    </VendorAuthContext.Provider>
  );
};

export const useVendorAuth = () => {
  const context = useContext(VendorAuthContext);
  if (!context) {
    throw new Error('useVendorAuth must be used within VendorAuthProvider');
  }
  return context;
};
