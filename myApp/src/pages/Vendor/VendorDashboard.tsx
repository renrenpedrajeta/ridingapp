// src/pages/Vendor/VendorDashboard.tsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
} from '@ionic/react';
import {
  cartOutline,
  cashOutline,
  hourglassOutline,
  checkmarkCircleOutline,
  timeOutline,
  starOutline,
} from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useVendorAuth } from '../../context/VendorAuthContext';
import VendorLayout from '../../layouts/VendorLayout';
import './VendorDashboard.css';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  time: string;
}

interface SalesData {
  date: string;
  sales: number;
}

// Mock data - all hardcoded and static
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-2026-001',
    customer: 'Sarah Chen',
    items: 3,
    total: 45.50,
    status: 'pending',
    time: '2 min ago',
  },
  {
    id: '2',
    orderNumber: '#ORD-2026-002',
    customer: 'Mike Johnson',
    items: 2,
    total: 32.00,
    status: 'preparing',
    time: '5 min ago',
  },
  {
    id: '3',
    orderNumber: '#ORD-2026-003',
    customer: 'Emma Wilson',
    items: 1,
    total: 18.75,
    status: 'ready',
    time: '8 min ago',
  },
  {
    id: '4',
    orderNumber: '#ORD-2026-004',
    customer: 'John Smith',
    items: 4,
    total: 62.00,
    status: 'delivered',
    time: '15 min ago',
  },
  {
    id: '5',
    orderNumber: '#ORD-2026-005',
    customer: 'Lisa Anderson',
    items: 2,
    total: 28.50,
    status: 'delivered',
    time: '22 min ago',
  },
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
  const { isVendorLoggedIn } = useVendorAuth();
  const history = useHistory();

  // Redirect if not logged in - using useEffect to avoid render issues
  useEffect(() => {
    if (!isVendorLoggedIn) {
      history.replace('/vendor/login');
    }
  }, [isVendorLoggedIn, history]);

  // If not logged in, show nothing while redirect happens
  if (!isVendorLoggedIn) {
    return null;
  }

  // Calculate stats from hardcoded data
  const totalOrders = MOCK_ORDERS.length;
  const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const totalEarnings = MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0);
  const todaySales = totalEarnings; // Same as total for demo
  const maxSales = Math.max(...MOCK_SALES_DATA.map(d => d.sales));
  const rating = 4.8;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return '#f97316';
      case 'preparing':
        return '#eab308';
      case 'ready':
        return '#06b6d4';
      case 'delivered':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return hourglassOutline;
      case 'preparing':
        return timeOutline;
      case 'ready':
        return checkmarkCircleOutline;
      case 'delivered':
        return checkmarkCircleOutline;
      default:
        return timeOutline;
    }
  };

  return (
    <VendorLayout pageTitle="Dashboard">
      <IonContent className="vendor-dashboard">
        {/* Overview Cards */}
        <div className="dashboard-section">
          <h2 className="section-title">Overview</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6" sizeLg="3" className="stat-card-col">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <div className="stat-header">
                      <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)' }}>
                        <IonIcon icon={cartOutline} />
                      </div>
                      <span className="stat-label">Total Orders</span>
                    </div>
                    <div className="stat-value">{totalOrders}</div>
                    <div className="stat-meta">📈 +5 this week</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3" className="stat-card-col">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <div className="stat-header">
                      <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #eab308 0%, #facc15 100%)' }}>
                        <IonIcon icon={hourglassOutline} />
                      </div>
                      <span className="stat-label">Pending Orders</span>
                    </div>
                    <div className="stat-value">{pendingOrders}</div>
                    <div className="stat-meta">⏱️ Needs attention</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3" className="stat-card-col">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <div className="stat-header">
                      <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)' }}>
                        <IonIcon icon={cashOutline} />
                      </div>
                      <span className="stat-label">Today's Sales</span>
                    </div>
                    <div className="stat-value">${todaySales.toFixed(2)}</div>
                    <div className="stat-meta">💰 +12.5% increase</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3" className="stat-card-col">
                <IonCard className="stat-card">
                  <IonCardContent>
                    <div className="stat-header">
                      <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)' }}>
                        <IonIcon icon={starOutline} />
                      </div>
                      <span className="stat-label">Rating</span>
                    </div>
                    <div className="stat-value">⭐ {rating}</div>
                    <div className="stat-meta">Based on {MOCK_ORDERS.length} reviews</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Sales Chart */}
        <div className="dashboard-section">
          <h2 className="section-title">Sales Overview (This Week)</h2>
          <IonCard className="chart-card">
            <IonCardContent>
              <div className="sales-chart">
                <div className="chart-legend">
                  <span>Sales: ${MOCK_SALES_DATA.reduce((sum, d) => sum + d.sales, 0).toFixed(2)}</span>
                </div>
                <div className="chart-bars">
                  {MOCK_SALES_DATA.map((data, index) => (
                    <div key={index} className="chart-bar-wrapper">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${(data.sales / maxSales) * 200}px`,
                          background: 'linear-gradient(180deg, #8b5cf6 0%, #6366f1 100%)',
                        }}
                        title={`${data.date}: $${data.sales}`}
                      />
                      <span className="chart-label">{data.date}</span>
                    </div>
                  ))}
                </div>
                <div className="chart-tooltip">Hover over bars to see details</div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Recent Orders */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Orders</h2>
            <IonButton
              fill="outline"
              size="small"
              onClick={() => window.location.href = '/vendor/orders'}
              style={{ '--color': '#8b5cf6', '--border-color': '#8b5cf6' } as any}
            >
              View All
            </IonButton>
          </div>

          <IonCard className="orders-card">
            <IonCardContent className="orders-table">
              <div className="table-header">
                <div className="col-order">Order</div>
                <div className="col-customer">Customer</div>
                <div className="col-amount">Amount</div>
                <div className="col-status">Status</div>
                <div className="col-time">Time</div>
              </div>

              {MOCK_ORDERS.slice(0, 5).map((order) => (
                <div key={order.id} className="table-row">
                  <div className="col-order">
                    <span className="order-id">{order.orderNumber}</span>
                  </div>
                  <div className="col-customer">
                    <span className="customer-name">{order.customer}</span>
                    <span className="item-count">{order.items} items</span>
                  </div>
                  <div className="col-amount">
                    <span className="amount">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="col-status">
                    <div className="status-badge" style={{ borderLeft: `4px solid ${getStatusColor(order.status)}` }}>
                      <IonIcon icon={getStatusIcon(order.status)} />
                      <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
                    </div>
                  </div>
                  <div className="col-time">
                    <span className="time">{order.time}</span>
                  </div>
                </div>
              ))}
            </IonCardContent>
          </IonCard>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2 className="section-title">Quick Actions</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="4">
                <IonButton
                  expand="block"
                  onClick={() => window.location.href = '/vendor/products'}
                  style={{
                    '--background': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    '--color': '#fff',
                  } as any}
                >
                  Add New Product
                </IonButton>
              </IonCol>
              <IonCol size="12" sizeMd="4">
                <IonButton
                  expand="block"
                  onClick={() => window.location.href = '/vendor/orders'}
                  style={{
                    '--background': 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
                    '--color': '#fff',
                  } as any}
                >
                  Manage Orders
                </IonButton>
              </IonCol>
              <IonCol size="12" sizeMd="4">
                <IonButton
                  expand="block"
                  onClick={() => window.location.href = '/vendor/earnings'}
                  style={{
                    '--background': 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
                    '--color': '#fff',
                  } as any}
                >
                  View Earnings
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div style={{ height: '40px' }} />
      </IonContent>
    </VendorLayout>
  );
};

export default VendorDashboard;
