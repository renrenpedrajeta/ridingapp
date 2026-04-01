// Static mock data for authentication testing
import { User, Rider } from '../types';

// Mock Users (regular customers)
export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'User@123',
    phone: '+1234567890',
    role: 'user',
    token: 'user-mock-token-1',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'User@123',
    phone: '+0987654321',
    role: 'user',
    token: 'user-mock-token-2',
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'User@123',
    phone: '+1122334455',
    role: 'user',
    token: 'user-mock-token-3',
  },
];

// Mock Riders (delivery personnel)
export const MOCK_RIDERS: (User & { password: string })[] = [
  {
    id: 'rider-1',
    name: 'Alex Chen',
    email: 'rider@example.com',
    password: 'Rider@123',
    phone: '+1111111111',
    role: 'rider',
    token: 'rider-mock-token-1',
    verificationStatus: 'approved',
    vehicle: 'Honda CB150',
    licensePlate: 'ABC-1234',
    licenseNumber: 'DL-2024-001',
    bankAccount: '1234567890',
    bankName: 'National Bank',
  },
  {
    id: 'rider-2',
    name: 'Sarah Brown',
    email: 'rider2@example.com',
    password: 'Rider@123',
    phone: '+2222222222',
    role: 'rider',
    token: 'rider-mock-token-2',
    verificationStatus: 'approved',
    vehicle: 'Yamaha YZF',
    licensePlate: 'XYZ-5678',
    licenseNumber: 'DL-2024-002',
    bankAccount: '0987654321',
    bankName: 'State Bank',
  },
  {
    id: 'rider-3',
    name: 'Tom Wilson',
    email: 'rider3@example.com',
    password: 'Rider@123',
    phone: '+3333333333',
    role: 'rider',
    token: 'rider-mock-token-3',
    verificationStatus: 'pending',
    vehicle: 'Kawasaki Ninja',
    licensePlate: 'DEF-9999',
    licenseNumber: 'DL-2024-003',
    bankAccount: '1111222233334444',
    bankName: 'Private Bank',
  },
];

// Mock Admins
export const MOCK_ADMINS: (User & { password: string })[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin@123',
    phone: '+9999999999',
    role: 'admin',
    token: 'admin-mock-token-1',
  },
  {
    id: 'admin-2',
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'Admin@123',
    phone: '+8888888888',
    role: 'admin',
    token: 'admin-mock-token-2',
  },
];

// Vendors are already defined separately in VendorAuthContext.tsx
// But here's a reference for completeness:
export const MOCK_VENDORS_REF = [
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

// Combined credentials for reference
export const ALL_CREDENTIALS = [
  {
    category: 'User Login',
    credentials: [
      { email: 'user@example.com', password: 'User@123' },
      { email: 'jane@example.com', password: 'User@123' },
      { email: 'mike@example.com', password: 'User@123' },
    ],
  },
  {
    category: 'Rider Login',
    credentials: [
      { email: 'rider@example.com', password: 'Rider@123', status: 'approved' },
      { email: 'rider2@example.com', password: 'Rider@123', status: 'approved' },
      { email: 'rider3@example.com', password: 'Rider@123', status: 'pending' },
    ],
  },
  {
    category: 'Admin Login',
    credentials: [
      { email: 'admin@example.com', password: 'Admin@123' },
      { email: 'superadmin@example.com', password: 'Admin@123' },
    ],
  },
  {
    category: 'Vendor Login',
    credentials: [
      { email: 'vendor@pizza.com', password: 'Vendor@123' },
      { email: 'vendor@burger.com', password: 'Vendor@123' },
    ],
  },
];
