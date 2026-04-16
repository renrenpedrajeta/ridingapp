// src/pages/Vendor/VendorDashboard.tsx
import React, { useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import './VendorDashboard.css';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready_for_pickup' | 'completed';
  time: string;
}

interface SalesData {
  date: string;
  sales: number;
}

const MOCK_ORDERS: Order[] = [
  { id: '1', orderNumber: '#ORD-001', customer: 'Sarah Chen', items: 3, total: 45.50, status: 'pending', time: '2 min ago' },
  { id: '2', orderNumber: '#ORD-002', customer: 'Mike Johnson', items: 2, total: 32.00, status: 'preparing', time: '5 min ago' },
  { id: '3', orderNumber: '#ORD-003', customer: 'Emma Wilson', items: 1, total: 18.75, status: 'ready_for_pickup', time: '8 min ago' },
  { id: '4', orderNumber: '#ORD-004', customer: 'John Smith', items: 4, total: 62.00, status: 'completed', time: '15 min ago' },
  { id: '5', orderNumber: '#ORD-005', customer: 'Lisa Anderson', items: 2, total: 28.50, status: 'completed', time: '22 min ago' },
];

const MOCK_SALES_DATA: SalesData[] = [
  { date: 'Mon', sales: 450 },
  { date: 'Tue', sales: 620 },
  { date: 'Wed', sales: 580 },
  { date: 'Thu', sales: 890 },
  { date: 'Fri', sales: 1050 },
  { date: 'Sat', sales: 1320 },
  { date: 'Sun', sales: 950 },
];

const VendorDashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isRoleAuthenticated } = useAuth();
  const ionRouter = useIonRouter();

  const isVendorAuthenticated = isRoleAuthenticated('vendor');

  useEffect(() => {
    if (!isVendorAuthenticated) {
      ionRouter.push('/vendor/login');
    }
  }, [isVendorAuthenticated, ionRouter]);

  if (!isVendorAuthenticated) {
    return null;
  }

  const totalOrders = MOCK_ORDERS.length;
  const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const totalEarnings = MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0);
  const todaySales = totalEarnings;
  const maxSales = Math.max(...MOCK_SALES_DATA.map(d => d.sales));
  const rating = 4.8;

  return (
    <IonPage>
      <IonContent className="vendor-dashboard ion-page-with-bottom-nav">
        <LogoHeader />
        
        {/* Overview Cards */}
        <div style={{ padding: '16px 0' }}>
          <div className="mobile-container">
            <h2 className="section-title">Overview</h2>
          </div>
          <div className="mobile-container">
            <div className="responsive-grid-2" style={{ gap: '12px' }}>
              <StatCard icon="📦" label="Total Orders" value={totalOrders} color="#f97316" trend="+5 this week" />
              <StatCard icon="⏳" label="Pending" value={pendingOrders} color="#eab308" trend="Needs attention" />
              <StatCard icon="💰" label="Today's Sales" value={`$${todaySales.toFixed(2)}`} color="#22c55e" trend="+12.5% increase" />
              <StatCard icon="⭐" label="Rating" value={rating} color="#06b6d4" />
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div style={{ padding: '16px 0' }}>
          <div className="mobile-container">
            <h2 className="section-title">Sales This Week</h2>
          </div>
          <div className="mobile-container">
            <IonCard style={{ margin: 0, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontWeight: 600 }}>Total: ${MOCK_SALES_DATA.reduce((sum, d) => sum + d.sales, 0).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '120px', gap: '8px' }}>
                {MOCK_SALES_DATA.map((data, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ 
                      width: '100%', 
                      height: `${(data.sales / maxSales) * 80}px`, 
                      background: 'linear-gradient(180deg, #8b5cf6 0%, #6366f1 100%)',
                      borderRadius: '4px'
                    }} />
                    <span style={{ fontSize: '10px', color: 'var(--ion-text-color-secondary)' }}>{data.date}</span>
                  </div>
                ))}
              </div>
            </IonCard>
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{ padding: '16px 0' }}>
          <div className="mobile-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="section-title">Recent Orders</h2>
            <IonButton fill="clear" size="small" onClick={() => ionRouter.push('/vendor/orders')} style={{ color: '#6366F1' } as any}>
              View All
            </IonButton>
          </div>
          <div className="mobile-container">
            {MOCK_ORDERS.slice(0, 3).map((order) => (
              <IonCard key={order.id} style={{ margin: '0 0 12px 0', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{order.orderNumber}</span>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
                      {order.customer} • {order.items} items
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 700, color: '#6366F1' }}>${order.total.toFixed(2)}</span>
                    <div style={{ marginTop: '4px' }}>
                      <StatusBadge status={order.status} size="small" />
                    </div>
                  </div>
                </div>
              </IonCard>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '16px 0' }}>
          <div className="mobile-container">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="mobile-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <IonButton expand="block" onClick={() => ionRouter.push('/vendor/products')} style={{ '--background': '#8b5cf6', '--color': '#fff', '--border-radius': '12px' } as any}>
                Add Product
              </IonButton>
              <IonButton expand="block" onClick={() => ionRouter.push('/vendor/orders')} style={{ '--background': '#06b6d4', '--color': '#fff', '--border-radius': '12px' } as any}>
                Manage Orders
              </IonButton>
              <IonButton expand="block" onClick={() => ionRouter.push('/vendor/settings')} style={{ '--background': '#22c55e', '--color': '#fff', '--border-radius': '12px' } as any}>
                Settings
              </IonButton>
            </div>
          </div>
        </div>

        <div style={{ height: '40px' }} />
      </IonContent>
      <BottomNav type="vendor" activeTab="home" />
    </IonPage>
  );
};

export default VendorDashboard;