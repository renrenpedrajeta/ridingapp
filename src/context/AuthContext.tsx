import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import type { UserRole } from '../types/auth';
import { MOCK_CREDENTIALS } from '../../src_refactored/data/mockData';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  token?: string;
  vehicle?: string;
  licensePlate?: string;
  licenseNumber?: string;
  bankAccount?: string;
  bankName?: string;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGuest: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: (targetRole?: UserRole) => void;
  register: (userData: Partial<AuthUser>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  continueAsGuest: () => void;
  getAuthUser: (checkRole: UserRole) => AuthUser | null;
  isRoleAuthenticated: (checkRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS: Record<UserRole, string> = {
  user: 'auth_user',
  rider: 'auth_rider',
  admin: 'auth_admin',
  vendor: 'auth_vendor',
  guest: 'auth_guest',
};

const ROLE_LOGIN_PATHS: Record<UserRole, string> = {
  user: '/login',
  rider: '/rider/login',
  admin: '/admin/login',
  vendor: '/vendor/login',
  guest: '/guest/home',
};

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  user: '/user/home',
  rider: '/rider/home',
  admin: '/admin/dashboard',
  vendor: '/vendor/dashboard',
  guest: '/guest/home',
};

const getStoredAuth = (role: UserRole): { user: AuthUser; role: UserRole } | null => {
  const key = STORAGE_KEYS[role];
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(key);
    }
  }
  return null;
};

const setStoredAuth = (role: UserRole, user: AuthUser): void => {
  const key = STORAGE_KEYS[role];
  localStorage.setItem(key, JSON.stringify({ user, role }));
};

const clearStoredAuth = (role: UserRole): void => {
  const key = STORAGE_KEYS[role];
  localStorage.removeItem(key);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  const isAuthenticated = !!user && !!role && role !== 'guest';

  useEffect(() => {
    const rolesToCheck: UserRole[] = ['user', 'rider', 'admin', 'vendor'];
    
    for (const r of rolesToCheck) {
      const stored = getStoredAuth(r);
      if (stored) {
        setUser(stored.user);
        setRole(stored.role);
        break;
      }
    }
    
    setIsLoading(false);
  }, []);

  const getAuthUser = useCallback((checkRole: UserRole): AuthUser | null => {
    const stored = getStoredAuth(checkRole);
    return stored?.user || null;
  }, []);

  const isRoleAuthenticated = useCallback((checkRole: UserRole): boolean => {
    const stored = getStoredAuth(checkRole);
    return !!stored && stored.role === checkRole;
  }, []);

  const login = useCallback(async (email: string, password: string, loginRole?: UserRole) => {
    const rolesToTry: UserRole[] = loginRole 
      ? [loginRole] 
      : ['user', 'rider', 'admin', 'vendor'];

    for (const role of rolesToTry) {
      const credentials = MOCK_CREDENTIALS[role];
      const found = credentials.find(cred => cred.email === email && cred.password === password);
      
      if (found) {
        const authUser: AuthUser = {
          id: `${role}-${Date.now()}`,
          name: email.split('@')[0],
          email,
          phone: '+1234567890',
          role,
          token: `${role}-mock-token-${Date.now()}`,
        };

        setUser(authUser);
        setRole(role);
        setStoredAuth(role, authUser);
        return;
      }
    }

    throw new Error('Invalid email or password');
  }, []);

  const logout = useCallback((targetRole?: UserRole) => {
    const logoutRole = targetRole || role;
    
    if (logoutRole && logoutRole !== 'guest') {
      clearStoredAuth(logoutRole);
    }
    
    setUser(null);
    setRole(null);
    setIsGuest(false);
    
    window.location.href = ROLE_LOGIN_PATHS[logoutRole || 'user'];
  }, [role]);

  const continueAsGuest = useCallback(() => {
    setIsGuest(true);
    setUser(null);
    setRole('guest');
  }, []);

  const register = useCallback(async (userData: Partial<AuthUser>) => {
    const { role: regRole = 'user' } = userData;
    const credentials = MOCK_CREDENTIALS[regRole];
    
    if (userData.email) {
      const exists = credentials.some(c => c.email === userData.email);
      if (exists) {
        throw new Error('Email already registered');
      }
    }

    const newUser: AuthUser = {
      id: `${regRole}-${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email || '',
      phone: userData.phone || '+1234567890',
      role: regRole,
      token: `${regRole}-mock-token-${Date.now()}`,
      vehicle: userData.vehicle,
      licensePlate: userData.licensePlate,
      licenseNumber: userData.licenseNumber,
      bankAccount: userData.bankAccount,
      bankName: userData.bankName,
      verificationStatus: userData.verificationStatus,
    };

    setUser(newUser);
    setRole(regRole);
    setStoredAuth(regRole, newUser);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    let found = false;
    const roles: UserRole[] = ['user', 'rider', 'admin', 'vendor'];
    
    for (const role of roles) {
      const credentials = MOCK_CREDENTIALS[role];
      if (credentials.some(c => c.email === email)) {
        found = true;
        break;
      }
    }

    if (!found) {
      throw new Error('If this email exists, you will receive reset instructions');
    }
    console.log(`Password reset email sent to ${email}`);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        isGuest,
        login,
        logout,
        register,
        resetPassword,
        continueAsGuest,
        getAuthUser,
        isRoleAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, ROLE_DASHBOARDS, ROLE_LOGIN_PATHS, STORAGE_KEYS };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;