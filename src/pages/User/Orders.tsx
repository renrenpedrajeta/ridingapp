// src/pages/User/Orders.tsx
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { checkmarkCircle, checkmarkDoneOutline, mapOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import '../../styles/mobile-first-responsive.css';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  status: string;
  vendorStatus: 'received' | 'preparing' | 'ready';
  riderStatus: 'waiting' | 'picked_up' | 'on_way' | 'delivered';
  timestamp: string;
  deliveryAddress: string;
}

const Orders: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (!user) {
      history.replace('/user/home');
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Simulate status progression over time
    const updatedOrders = allOrders.map((order: Order) => {
      const timeElapsed = Date.now() - new Date(order.timestamp).getTime();
      const minutesElapsed = Math.floor(timeElapsed / 60000);

      let vendorStatus = order.vendorStatus;
      let riderStatus = order.riderStatus;

      if (minutesElapsed > 15) {
        vendorStatus = 'ready';
      } else if (minutesElapsed > 5) {
        vendorStatus = 'preparing';
      }

      if (minutesElapsed > 20) {
        riderStatus = 'picked_up';
      }

      if (minutesElapsed > 30) {
        riderStatus = 'on_way';
      }

      if (minutesElapsed > 35) {
        riderStatus = 'delivered';
      }

      return { ...order, vendorStatus, riderStatus };
    });

    setOrders(updatedOrders);
  }, [user, history]);

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : selectedFilter === 'active'
    ? orders.filter(o => o.riderStatus !== 'delivered')
    : orders.filter(o => o.riderStatus === 'delivered');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
      case 'waiting':
        return '#F59E0B';
      case 'preparing':
      case 'picked_up':
        return '#3B82F6';
      case 'ready':
      case 'on_way':
        return '#10B981';
      case 'delivered':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusLabel = (vendorStatus: string, riderStatus: string) => {
    if (riderStatus === 'delivered') return 'Delivered';
    if (riderStatus === 'on_way') return 'On the Way';
    if (riderStatus === 'picked_up') return 'Rider Picked Up';
    if (vendorStatus === 'ready') return 'Ready for Pickup';
    if (vendorStatus === 'preparing') return 'Preparing Order';
    return 'Order Received';
  };

  const getProgressPercentage = (vendorStatus: string, riderStatus: string) => {
    if (riderStatus === 'delivered') return 100;
    if (riderStatus === 'on_way') return 75;
    if (riderStatus === 'picked_up') return 50;
    if (vendorStatus === 'ready') return 35;
    if (vendorStatus === 'preparing') return 20;
    return 10;
  };

  return (
    <IonPage>
      <IonContent className="ion-page-with-bottom-nav" style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Logo Header */}
        <LogoHeader />

        <div style={{ padding: '12px' }}>
          {/* Filter Segment */}
          <div style={{ marginBottom: '12px' }}>
            <IonSegment
              value={selectedFilter}
              onIonChange={(e) => setSelectedFilter(e.detail.value as any)}
              className="orders-segment"
            >
              <IonSegmentButton value="all" style={{ '--color': '#6366F1', '--color-checked': '#FFFFFF', '--background-checked': '#6366F1', fontSize: '12px' }}>
                <IonLabel>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="active" style={{ '--color': '#6366F1', '--color-checked': '#FFFFFF', '--background-checked': '#6366F1', fontSize: '12px' }}>
                <IonLabel>Active</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="completed" style={{ '--color': '#6366F1', '--color-checked': '#FFFFFF', '--background-checked': '#6366F1', fontSize: '12px' }}>
                <IonLabel>Done</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="empty-state-container">
              <IonIcon icon={mapOutline} style={{ fontSize: '48px', color: 'var(--ion-text-color-secondary)', marginBottom: '16px' }} />
              <p className="empty-state-text">No {selectedFilter === 'all' ? '' : selectedFilter} orders yet</p>
              <IonButton
                expand="block"
                color="primary"
                className="mobile-button"
                style={{ '--background': '#6366F1', maxWidth: '200px', marginTop: '8px' }}
                onClick={() => history.push('/user/home')}
              >
                Start Shopping
              </IonButton>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '12px', padding: '0 12px 12px 12px' }}>
              {filteredOrders.map((order) => (
                <IonCard key={order.id} style={{ marginBottom: 0 }}>
                  <IonCardContent style={{ padding: '12px' }}>
                    {/* Order Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--ion-border-color)' }}>
                      <div>
                        <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase' }}>Order ID</p>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--ion-text-color)' }}>{order.id}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase' }}>Amount</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#6366F1' }}>₱{order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Order Items Summary */}
                    <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--ion-border-color)' }}>
                      <p style={{ margin: '0 0 8px', fontSize: '11px', color: 'var(--ion-text-color-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Items</p>
                      <div>
                        {order.items.slice(0, 2).map((item, idx) => (
                          <p key={idx} style={{ margin: '4px 0', fontSize: '13px', color: 'var(--ion-text-color)' }}>
                            {item.name} x{item.quantity}
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p style={{ margin: '4px 0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
                            +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status Progress */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--ion-text-color)' }}>
                          {getStatusLabel(order.vendorStatus, order.riderStatus)}
                        </p>
                        <span style={{ fontSize: '11px', color: 'var(--ion-text-color-secondary)' }}>
                          {getProgressPercentage(order.vendorStatus, order.riderStatus)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${getProgressPercentage(order.vendorStatus, order.riderStatus)}%`,
                            background: getStatusColor(order.riderStatus),
                          }}
                        />
                      </div>
                    </div>

                    {/* Tracking Steps - Horizontal Scroll */}
                    <div style={{ marginBottom: '12px' }}>
                      <div className="tracking-steps-container">
                        <div className="tracking-steps">
                          {/* Received */}
                          <div className="tracking-step">
                            <div className="tracking-step-circle" style={{ background: '#10B981' }}>
                              <IonIcon icon={checkmarkCircle} style={{ fontSize: '12px', color: 'white' }} />
                            </div>
                            <span className="tracking-step-label">Received</span>
                          </div>

                          {/* Preparing */}
                          <div className="tracking-step">
                            <div className="tracking-step-circle" style={{ background: order.vendorStatus === 'received' ? 'var(--ion-border-color)' : '#10B981' }}>
                              {(order.vendorStatus === 'preparing' || order.vendorStatus === 'ready') && (
                                <IonIcon icon={checkmarkCircle} style={{ fontSize: '12px', color: 'white' }} />
                              )}
                            </div>
                            <span className="tracking-step-label">Preparing</span>
                          </div>

                          {/* Pickup */}
                          <div className="tracking-step">
                            <div className="tracking-step-circle" style={{ background: (order.riderStatus === 'picked_up' || order.riderStatus === 'on_way' || order.riderStatus === 'delivered') ? '#10B981' : 'var(--ion-border-color)' }}>
                              {(order.riderStatus === 'picked_up' || order.riderStatus === 'on_way' || order.riderStatus === 'delivered') && (
                                <IonIcon icon={checkmarkCircle} style={{ fontSize: '12px', color: 'white' }} />
                              )}
                            </div>
                            <span className="tracking-step-label">Pickup</span>
                          </div>

                          {/* Delivered */}
                          <div className="tracking-step">
                            <div className="tracking-step-circle" style={{ background: order.riderStatus === 'delivered' ? '#10B981' : 'var(--ion-border-color)' }}>
                              {order.riderStatus === 'delivered' && (
                                <IonIcon icon={checkmarkDoneOutline} style={{ fontSize: '12px', color: 'white' }} />
                              )}
                            </div>
                            <span className="tracking-step-label">Delivered</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div style={{ padding: '10px 12px', background: 'var(--ion-background-color)', borderRadius: '6px', marginBottom: '10px' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Delivery Location</p>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--ion-text-color)' }}>{order.deliveryAddress}</p>
                    </div>

                    {/* Action Button */}
                    {order.riderStatus !== 'delivered' && (
                      <IonButton expand="block" color="primary" fill="outline" className="mobile-button-small" style={{ '--background': '#6366F1', fontSize: '13px' }}>
                        Live Tracking
                      </IonButton>
                    )}
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav type="user" activeTab="home" />
      </IonContent>
    </IonPage>
  );
};

export default Orders;
