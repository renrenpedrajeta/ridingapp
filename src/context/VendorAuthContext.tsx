// src/context/VendorAuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_VENDORS, type Vendor } from '../../src_refactored/data/mockData';

// Re-export Vendor type for backward compatibility
export type { Vendor };

// Type is already exported from mockData/vendors, re-exporting for compatibility

interface VendorAuthContextType {
  vendor: Vendor | null;
  isVendorLoggedIn: boolean;
  isLoading: boolean;
  vendorLogin: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  vendorRegister: (vendorData: Vendor) => Promise<void>;
  vendorLogout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const VendorAuthContext = createContext<VendorAuthContextType | undefined>(undefined);

export const VendorAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedVendor = localStorage.getItem('vendor');
    if (savedVendor) {
      const vendorData = JSON.parse(savedVendor);
      setVendor(vendorData);
      setIsVendorLoggedIn(true);
    } else {
      const sessionVendor = sessionStorage.getItem('vendor');
      if (sessionVendor) {
        const vendorData = JSON.parse(sessionVendor);
        setVendor(vendorData);
        setIsVendorLoggedIn(true);
      }
    }
    setIsLoading(false);
  }, []);

  const vendorLogin = async (email: string, password: string, rememberMe: boolean) => {
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
    const exists = MOCK_VENDORS.some(v => v.email === vendorData.email);
    if (exists) {
      throw new Error('Email already registered');
    }

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
    const foundVendor = MOCK_VENDORS.find(v => v.email === email);
    if (!foundVendor) {
      throw new Error('If this email exists, you will receive reset instructions');
    }
    console.log(`Password reset email sent to ${email}`);
  };

  return (
    <VendorAuthContext.Provider
      value={{
        vendor,
        isVendorLoggedIn,
        isLoading,
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
    return {
      vendor: null,
      isVendorLoggedIn: false,
      isLoading: true,
      vendorLogin: async () => { throw new Error('VendorAuthProvider not found'); },
      vendorRegister: async () => { throw new Error('VendorAuthProvider not found'); },
      vendorLogout: () => {},
      resetPassword: async () => { throw new Error('VendorAuthProvider not found'); },
    };
  }
  return context;
};