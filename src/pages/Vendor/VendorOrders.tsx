// src/pages/Vendor/VendorOrders.tsx
import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonButton,
} from '@ionic/react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import StatusBadge from '../../components/StatusBadge';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  price: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  date: string;
}

const MOCK_ORDERS: Order[] = [
  { id: '1', orderNumber: '#ORD-001', customer: 'Sarah Chen', items: 3, price: 45.50, status: 'pending', date: 'Mar 13, 2026' },
  { id: '2', orderNumber: '#ORD-002', customer: 'Mike Johnson', items: 2, price: 32.00, status: 'preparing', date: 'Mar 13, 2026' },
  { id: '3', orderNumber: '#ORD-003', customer: 'Emma Wilson', items: 1, price: 18.75, status: 'pending', date: 'Mar 13, 2026' },
  { id: '4', orderNumber: '#ORD-004', customer: 'John Smith', items: 4, price: 62.00, status: 'completed', date: 'Mar 12, 2026' },
  { id: '5', orderNumber: '#ORD-005', customer: 'Lisa Anderson', items: 2, price: 28.50, status: 'cancelled', date: 'Mar 12, 2026' },
  { id: '6', orderNumber: '#ORD-006', customer: 'Alex Davis', items: 5, price: 85.25, status: 'preparing', date: 'Mar 13, 2026' },
];

const VendorOrders: React.FC = () => {
  const ionRouter = useIonRouter();
  const { isDarkMode } = useTheme();
  const { isRoleAuthenticated } = useAuth();

  const isVendorAuthenticated = isRoleAuthenticated('vendor');

  if (!isVendorAuthenticated) {
    ionRouter.push('/vendor/login');
    return null;
  }

  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'preparing' | 'completed' | 'cancelled') => {
    setOrders(orders.map((order) => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const filteredOrders = orders;

  return (
    <IonPage>
      <IonContent className="ion-page-with-bottom-nav">
        <LogoHeader />
        
        <div className="mobile-container">
          <h1 className="section-title">Orders</h1>
          <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: '16px' }}>Manage and track all customer orders</p>
        </div>

        {/* Orders List */}
        <div className="mobile-container">
          {filteredOrders.map((order) => (
            <IonCard key={order.id} style={{ margin: '0 0 12px 0', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>{order.orderNumber}</span>
                  <p style={{ margin: '4px 0 0', fontSize: '14px' }}>{order.customer}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--ion-text-color-secondary)' }}>
                  {order.items} items • {order.date}
                </span>
                <span style={{ fontWeight: 700, fontSize: '18px', color: '#6366F1' }}>
                  ${order.price.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {order.status === 'pending' && (
                  <IonButton size="small" onClick={() => handleStatusChange(order.id, 'preparing')} style={{ '--background': '#10B981' } as any}>
                    Accept
                  </IonButton>
                )}
                {order.status === 'pending' && (
                  <IonButton size="small" fill="outline" onClick={() => handleStatusChange(order.id, 'cancelled')} style={{ '--border-color': '#EF4444', '--color': '#EF4444' } as any}>
                    Reject
                  </IonButton>
                )}
                {order.status === 'preparing' && (
                  <IonButton size="small" onClick={() => handleStatusChange(order.id, 'completed')} style={{ '--background': '#10B981' } as any}>
                    Complete
                  </IonButton>
                )}
              </div>
            </IonCard>
          ))}
        </div>

        <div style={{ height: '40px' }} />
      </IonContent>
      <BottomNav type="vendor" activeTab="orders" />
    </IonPage>
  );
};

export default VendorOrders;