// src/pages/Vendor/VendorOrders.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonBadge,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  timeOutline,
  checkmarkOutline,
  closeOutline,
} from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useVendorAuth } from '../../context/VendorAuthContext';
import VendorLayout from '../../layouts/VendorLayout';
import './VendorOrders.css';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  price: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  date: string;
}

// Mock data - all hardcoded and static
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-2026-001',
    customer: 'Sarah Chen',
    items: 3,
    price: 45.50,
    status: 'pending',
    date: 'Mar 13, 2026',
  },
  {
    id: '2',
    orderNumber: '#ORD-2026-002',
    customer: 'Mike Johnson',
    items: 2,
    price: 32.00,
    status: 'preparing',
    date: 'Mar 13, 2026',
  },
  {
    id: '3',
    orderNumber: '#ORD-2026-003',
    customer: 'Emma Wilson',
    items: 1,
    price: 18.75,
    status: 'pending',
    date: 'Mar 13, 2026',
  },
  {
    id: '4',
    orderNumber: '#ORD-2026-004',
    customer: 'John Smith',
    items: 4,
    price: 62.00,
    status: 'completed',
    date: 'Mar 12, 2026',
  },
  {
    id: '5',
    orderNumber: '#ORD-2026-005',
    customer: 'Lisa Anderson',
    items: 2,
    price: 28.50,
    status: 'cancelled',
    date: 'Mar 12, 2026',
  },
  {
    id: '6',
    orderNumber: '#ORD-2026-006',
    customer: 'Alex Davis',
    items: 5,
    price: 85.25,
    status: 'preparing',
    date: 'Mar 13, 2026',
  },
  {
    id: '7',
    orderNumber: '#ORD-2026-007',
    customer: 'Jessica Brown',
    items: 3,
    price: 39.00,
    status: 'completed',
    date: 'Mar 11, 2026',
  },
  {
    id: '8',
    orderNumber: '#ORD-2026-008',
    customer: 'Robert Taylor',
    items: 2,
    price: 22.75,
    status: 'pending',
    date: 'Mar 13, 2026',
  },
];

const VendorOrders: React.FC = () => {
  const history = useHistory();
  const { isDarkMode } = useTheme();
  const { isVendorLoggedIn } = useVendorAuth();

  if (!isVendorLoggedIn) {
    history.replace('/vendor/login');
    return null;
  }

  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return '#F59E0B'; // Yellow
      case 'preparing':
        return '#3B82F6'; // Blue
      case 'completed':
        return '#10B981'; // Green
      case 'cancelled':
        return '#EF4444'; // Red
      default:
        return 'var(--ion-text-color-secondary)';
    }
  };

  const getStatusLabel = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'preparing' | 'completed' | 'cancelled') => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <VendorLayout pageTitle="Orders Management">
      <IonContent>
        <div className="orders-page">
          <div className="page-header">
            <h1>Orders Management</h1>
            <IonText className="page-subtitle">Manage and track all customer orders</IonText>
          </div>

          {/* Desktop Table View */}
          <div className="orders-table-container">
            <IonCard className="orders-card">
              <IonCardContent className="table-content">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="order-row">
                        <td>
                          <span className="order-id">{order.orderNumber}</span>
                        </td>
                        <td>
                          <span className="customer-name">{order.customer}</span>
                        </td>
                        <td>
                          <span className="item-count">{order.items} items</span>
                        </td>
                        <td>
                          <span className="price">${order.price.toFixed(2)}</span>
                        </td>
                        <td>
                          <IonBadge
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {getStatusLabel(order.status)}
                          </IonBadge>
                        </td>
                        <td>
                          <span className="date">{order.date}</span>
                        </td>
                        <td>
                          <div className="actions-cell">
                            {order.status === 'pending' && (
                              <>
                                <IonButton
                                  size="small"
                                  color="success"
                                  fill="solid"
                                  onClick={() => handleStatusChange(order.id, 'preparing')}
                                  className="action-btn"
                                >
                                  <IonIcon icon={checkmarkOutline} slot="start" />
                                  Accept
                                </IonButton>
                                <IonButton
                                  size="small"
                                  color="danger"
                                  fill="solid"
                                  onClick={() => handleStatusChange(order.id, 'cancelled')}
                                  className="action-btn"
                                >
                                  <IonIcon icon={closeOutline} slot="start" />
                                  Reject
                                </IonButton>
                              </>
                            )}
                            {order.status === 'preparing' && (
                              <IonButton
                                size="small"
                                color="success"
                                fill="solid"
                                onClick={() => handleStatusChange(order.id, 'completed')}
                                className="action-btn"
                              >
                                <IonIcon icon={checkmarkCircleOutline} slot="start" />
                                Complete
                              </IonButton>
                            )}
                            {order.status === 'completed' && (
                              <span className="completed-text">✓ Completed</span>
                            )}
                            {order.status === 'cancelled' && (
                              <span className="cancelled-text">✕ Cancelled</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Mobile Card View */}
          <div className="orders-mobile-container">
            {orders.map((order) => (
              <IonCard key={order.id} className="order-card-mobile">
                <IonCardContent>
                  <div className="order-card-header">
                    <div>
                      <IonText className="order-number">{order.orderNumber}</IonText>
                      <IonText className="customer-name">{order.customer}</IonText>
                    </div>
                    <IonBadge
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusLabel(order.status)}
                    </IonBadge>
                  </div>

                  <div className="order-card-details">
                    <div className="detail-item">
                      <span className="detail-label">Items</span>
                      <span className="detail-value">{order.items} items</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Price</span>
                      <span className="detail-value">${order.price.toFixed(2)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">{order.date}</span>
                    </div>
                  </div>

                  <div className="order-card-actions">
                    {order.status === 'pending' && (
                      <>
                        <IonButton
                          expand="block"
                          color="success"
                          fill="solid"
                          size="small"
                          onClick={() => handleStatusChange(order.id, 'preparing')}
                        >
                          <IonIcon icon={checkmarkOutline} slot="start" />
                          Accept
                        </IonButton>
                        <IonButton
                          expand="block"
                          color="danger"
                          fill="solid"
                          size="small"
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                        >
                          <IonIcon icon={closeOutline} slot="start" />
                          Reject
                        </IonButton>
                      </>
                    )}
                    {order.status === 'preparing' && (
                      <IonButton
                        expand="block"
                        color="success"
                        fill="solid"
                        size="small"
                        onClick={() => handleStatusChange(order.id, 'completed')}
                      >
                        <IonIcon icon={checkmarkCircleOutline} slot="start" />
                        Mark Completed
                      </IonButton>
                    )}
                    {order.status === 'completed' && (
                      <div className="completed-badge">✓ Order Completed</div>
                    )}
                    {order.status === 'cancelled' && (
                      <div className="cancelled-badge">✕ Order Cancelled</div>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </VendorLayout>
  );
};

export default VendorOrders;
