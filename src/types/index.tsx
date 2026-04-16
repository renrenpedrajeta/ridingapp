// src/types/index.ts
export interface Stall {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  cuisine: string;
  location: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  stallId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'guest' | 'user' | 'rider' | 'admin';
  token?: string;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
  vehicle?: string;
  licensePlate?: string;
  licenseNumber?: string;
  bankAccount?: string;
  bankName?: string;
}

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  totalDeliveries: number;
  earnings: number;
  vehicle: string;
  licensePlate: string;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  storeAddress?: string;
  storeCategory?: string;
  image?: string;
  rating?: number;
  totalOrders?: number;
  status?: 'active' | 'offline';
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  vendorId?: string;
  riderId?: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  stallName: string;
  status: 'pending' | 'preparing' | 'ready_for_pickup' | 'completed' | 'rejected' | 'cancelled';
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  createdAt: Date;
  acceptedAt?: Date;
  readyAt?: Date;
  pickedUpAt?: Date;
  completedAt?: Date;
  estimatedDeliveryTime?: string;
  notes?: string;
}

export interface RiderOrder extends Order {
  riderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  pickupAddress: string;
  distance: number;
}

export interface RiderEarning {
  id: string;
  riderId: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'paid';
  createdAt: Date;
}

// Activity Log System
export interface Activity {
  id: string;
  userId: string;
  type: 'order_placed' | 'order_accepted' | 'order_delivering' | 'order_delivered' | 'order_cancelled' | 'user_login' | 'rider_online' | 'rider_offline' | 'payment_made' | 'report_filed' | 'report_resolved';
  title: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  severity?: 'info' | 'warning' | 'critical';
}

// User-to-Rider, Vendor-to-User, Vendor-to-Rider Messaging
export interface Message {
  id: string;
  senderId: string;
  senderRole: 'user' | 'rider' | 'vendor';
  receiverId: string;
  orderId?: string;
  content: string;
  attachments?: string[];
  isRead: boolean;
  messageType: 'text' | 'notification' | 'system';
  createdAt: Date;
  updatedAt: Date;
}

// Real-time Notifications
export interface Notification {
  id: string;
  userId?: string; // recipient user
  vendorId?: string; // recipient vendor
  riderId?: string; // recipient rider
  orderId: string;
  type: 'order_placed' | 'order_accepted' | 'order_rejected' | 'order_preparing' | 'order_ready' | 'rider_accepted' | 'rider_on_way' | 'order_delivered' | 'order_cancelled' | 'message' | 'status_update';
  title: string;
  message: string;
  data?: {
    orderId?: string;
    stallName?: string;
    customerName?: string;
    riderName?: string;
    estimatedTime?: string;
    amount?: number;
  };
  isRead: boolean;
  createdAt: Date;
}

// Incident Report System
export interface Report {
  id: string;
  reporterId: string;
  reporterRole: 'user' | 'rider';
  reportType: 'order_issue' | 'rider_behavior' | 'poor_condition' | 'safety_concern' | 'payment_issue' | 'other';
  title: string;
  description: string;
  orderId?: string;
  riderId?: string;
  attachments?: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  resolution?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
}