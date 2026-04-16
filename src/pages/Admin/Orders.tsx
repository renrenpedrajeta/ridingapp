// src/pages/Admin/Orders.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonIcon,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
} from '@ionic/react';
import { cartOutline, timeOutline, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';

const AdminOrders: React.FC = () => {
  const ionRouter = useIonRouter();
  const { getAuthUser } = useAuth();

  const currentAdmin = getAuthUser('admin');

  // Protect this page - redirect if not admin
  if (!currentAdmin) {
    ionRouter.push('/admin/login');
    return null;
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [orders, setOrders] = useState<any[]>([
    {
      id: '1',
      stallName: 'Burger King',
      customerName: 'Maria Santos',
      riderName: 'Juan Dela Cruz',
      total: 450.50,
      status: 'completed',
      createdAt: '2024-03-04 10:30 AM',
      completedAt: '2024-03-04 10:45 AM',
      rating: 5,
      estimatedDeliveryTime: undefined,
      cancelledAt: undefined,
    },
    {
      id: '2',
      stallName: 'Sushi Master',
      customerName: 'Carlos Rodriguez',
      riderName: 'Maria Gonzales',
      total: 620.75,
      status: 'ready_for_pickup',
      createdAt: '2024-03-04 11:15 AM',
      estimatedDeliveryTime: '11:45 AM',
      rating: null,
      completedAt: undefined,
      cancelledAt: undefined,
    },
    {
      id: '3',
      stallName: 'Pizza Palace',
      customerName: 'Ana Cruz',
      riderName: 'Juan Dela Cruz',
      total: 380.25,
      status: 'preparing',
      createdAt: '2024-03-04 11:30 AM',
      estimatedDeliveryTime: '12:15 PM',
      rating: null,
      completedAt: undefined,
      cancelledAt: undefined,
    },
    {
      id: '4',
      stallName: 'Chicken Fried',
      customerName: 'Pedro Reyes',
      riderName: 'Carlos Santos',
      total: 520.00,
      status: 'cancelled',
      createdAt: '2024-03-04 09:30 AM',
      cancelledAt: '2024-03-04 09:45 AM',
      rating: null,
      estimatedDeliveryTime: undefined,
      completedAt: undefined,
    },
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && order.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'preparing': return '#3B82F6';
      case 'ready_for_pickup': return '#F59E0B';
      case 'completed': return '#10B981';
      case 'rejected': return '#EF4444';
      case 'cancelled': return '#EF4444';
      default: return '#9CA3AF';
    }
  };

  const cancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status: 'cancelled', cancelledAt: new Date().toLocaleString() }
          : order
      ));
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-page-with-bottom-nav">
        <LogoHeader />
        
        {/* Header */}
        <div className="mobile-container">
          <h2 className="section-title" style={{ margin: '0 0 16px' }}>
            Manage Orders
          </h2>
          <IonSearchbar
            value={searchQuery}
            onIonChange={e => setSearchQuery(e.detail.value!)}
            placeholder="Search by order ID, stall, or customer..."
            style={{
              '--background': 'var(--ion-card-background)',
              '--border-radius': '12px',
              '--border': '1px solid var(--ion-border-color)',
              '--placeholder-color': 'var(--ion-text-color-secondary)',
              '--icon-color': 'var(--ion-color-primary)',
              '--color': 'var(--ion-text-color)',
              padding: '0',
              height: '48px',
            } as any}
          />
        </div>

        {/* Filter */}
        <div style={{ padding: '0 16px 16px', overflowX: 'auto' }}>
          <IonSegment
            value={filterStatus}
            onIonChange={e => setFilterStatus(e.detail.value as string)}
            scrollable
            style={{ '--background': 'transparent' }}
          >
            <IonSegmentButton value="all" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px', whiteSpace: 'nowrap' }}>
              <IonLabel style={{ fontSize: '12px' }}>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="pending" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px', whiteSpace: 'nowrap' }}>
              <IonLabel style={{ fontSize: '12px' }}>Pending</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="preparing" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px', whiteSpace: 'nowrap' }}>
              <IonLabel style={{ fontSize: '12px' }}>Preparing</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ready_for_pickup" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px', whiteSpace: 'nowrap' }}>
              <IonLabel style={{ fontSize: '12px' }}>Ready for Pickup</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="completed" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px', whiteSpace: 'nowrap' }}>
              <IonLabel style={{ fontSize: '12px' }}>Completed</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Orders List */}
        <div style={{ padding: '0 16px 16px' }}>
          {filteredOrders.length === 0 ? (
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)', textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ color: 'var(--ion-text-color-secondary)' }}>No orders found</p>
            </IonCard>
          ) : (
            filteredOrders.map(order => (
              <IonCard key={order.id} style={{ margin: '0 0 12px', background: 'var(--ion-card-background)' }}>
                <IonCardContent style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>
                          Order #{order.id}
                        </h3>
                        <StatusBadge status={order.status} />
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--ion-text-color-secondary)' }}>
                        {order.stallName}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#6366F1' }}>
                        ₱{order.total.toFixed(2)}
                      </h4>
                    </div>
                  </div>

                  <div style={{
                    padding: '12px',
                    background: 'var(--ion-background-color)',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    fontSize: '13px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--ion-text-color-secondary)' }}>Customer:</span>
                      <span style={{ color: 'var(--ion-text-color)', fontWeight: 600 }}>{order.customerName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--ion-text-color-secondary)' }}>Rider:</span>
                      <span style={{ color: 'var(--ion-text-color)', fontWeight: 600 }}>{order.riderName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--ion-text-color-secondary)' }}>Order Time:</span>
                      <span style={{ color: 'var(--ion-text-color)', fontWeight: 600 }}>{order.createdAt}</span>
                    </div>
                    {order.status === 'delivered' && order.rating && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid var(--ion-border-color)' }}>
                        <span style={{ color: 'var(--ion-text-color-secondary)' }}>Rating:</span>
                        <span style={{ color: '#F59E0B', fontWeight: 600 }}>★ {order.rating}</span>
                      </div>
                    )}
                  </div>

                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <IonButton
                      fill="outline"
                      size="small"
                      expand="block"
                      style={{ '--border-color': '#EF4444', '--color': '#EF4444', margin: 0 }}
                      onClick={() => cancelOrder(order.id)}
                    >
                      <IonIcon slot="start" icon={closeCircleOutline} />
                      Cancel Order
                    </IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      </IonContent>
      <BottomNav type="admin" activeTab="orders" />
    </IonPage>
  );
};

export default AdminOrders;
