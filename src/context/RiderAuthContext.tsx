import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { MOCK_RIDERS } from '../../src_refactored/data/mockData';

interface RiderAuthContextType {
  rider: User | null;
  isRiderLoggedIn: boolean;
  isLoading: boolean;
  riderLogin: (email: string, password: string) => Promise<void>;
  riderRegister: (riderData: Partial<User>) => Promise<void>;
  riderLogout: () => void;
}

const RiderAuthContext = createContext<RiderAuthContextType | undefined>(undefined);

export const RiderAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rider, setRider] = useState<User | null>(null);
  const [isRiderLoggedIn, setIsRiderLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRider = localStorage.getItem('rider');
    if (savedRider) {
      const parsedRider = JSON.parse(savedRider);
      if (parsedRider.role === 'rider') {
        setRider(parsedRider);
        setIsRiderLoggedIn(true);
      } else {
        localStorage.removeItem('rider');
      }
    }
    setIsLoading(false);
  }, []);

  const riderLogin = async (email: string, password: string) => {
    const foundRider = MOCK_RIDERS.find(
      (r) => r.email === email && r.password === password && r.role === 'rider'
    );

    if (!foundRider) {
      throw new Error('Invalid rider email or password');
    }

    const { password: _, ...riderWithoutPassword } = foundRider;
    const mockRider: User = riderWithoutPassword;

    setRider(mockRider);
    setIsRiderLoggedIn(true);
    localStorage.setItem('rider', JSON.stringify(mockRider));
  };

  const riderRegister = async (riderData: Partial<User>) => {
    if (riderData.role !== 'rider') {
      throw new Error('Invalid role for rider registration');
    }

    const emailExists = MOCK_RIDERS.some((r: User) => r.email === riderData.email);
    if (emailExists) {
      throw new Error('Email already registered as rider');
    }

    const newRider: User = {
      id: `rider-${Date.now()}`,
      name: riderData.name || '',
      email: riderData.email || '',
      phone: riderData.phone || '',
      role: 'rider',
      verificationStatus: 'pending',
      token: `rider-token-${Date.now()}`,
      vehicle: riderData.vehicle,
      licensePlate: riderData.licensePlate,
      licenseNumber: riderData.licenseNumber,
      bankAccount: riderData.bankAccount,
      bankName: riderData.bankName,
    };

    MOCK_RIDERS.push(newRider as User & { password: string });
    setRider(newRider);
    setIsRiderLoggedIn(true);
    localStorage.setItem('rider', JSON.stringify(newRider));
  };

  const riderLogout = () => {
    setRider(null);
    setIsRiderLoggedIn(false);
    localStorage.removeItem('rider');
  };

  return (
    <RiderAuthContext.Provider
      value={{ rider, isRiderLoggedIn, isLoading, riderLogin, riderRegister, riderLogout }}
    >
      {children}
    </RiderAuthContext.Provider>
  );
};

export const useRiderAuth = () => {
  const context = useContext(RiderAuthContext);
  if (!context) {
    return {
      rider: null,
      isRiderLoggedIn: false,
      isLoading: true,
      riderLogin: async () => { throw new Error('RiderAuthProvider not found'); },
      riderRegister: async () => { throw new Error('RiderAuthProvider not found'); },
      riderLogout: () => {},
    };
  }
  return context;
};