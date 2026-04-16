// src/pages/Rider/Orders.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { timeOutline, navigateOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

const RiderOrders: React.FC = () => {
  const ionRouter = useIonRouter();
  const { getAuthUser } = useAuth();

  const currentRider = getAuthUser('rider');

  if (!currentRider) {
    ionRouter.push('/rider/login');
    return null;
  }

  const [selectedTab, setSelectedTab] = useState('active');

  const activeOrders = [
    {
      id: '1',
      stallName: 'Burger King',
      customerName: 'John Doe',
      customerNumber: '09123456789',
      status: 'ready_for_pickup',
      fee: 45,
      estimatedTime: '12 min',
      deliveryAddress: 'Fort Bonifacio, Taguig',
    },
    {
      id: '2',
      stallName: 'Sushi Master',
      customerName: 'Jane Smith',
      customerNumber: '09987654321',
      status: 'ready_for_pickup',
      fee: 38,
      estimatedTime: '8 min',
      deliveryAddress: 'Paseo de Santa Rosa, Manila',
    },
  ];

  const completedOrders = [
    {
      id: '3',
      stallName: 'Pizza Palace',
      customerName: 'Mike Johnson',
      customerNumber: '09111222333',
      status: 'completed',
      fee: 52,
      completedAt: '2:30 PM',
      rating: 5,
    },
    {
      id: '4',
      stallName: 'Chicken Fried Shop',
      customerName: 'Sarah Lee',
      customerNumber: '09444555666',
      status: 'completed',
      fee: 40,
      completedAt: '1:15 PM',
      rating: 4.5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready_for_pickup': return '#F59E0B';
      case 'completed': return '#10B981';
      default: return '#9CA3AF';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready_for_pickup': return 'Ready for Pickup';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <IonPage>
      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any} className="content-with-sticky-footer ion-page-with-bottom-nav">
        {/* Logo Header */}
        <LogoHeader />

        {/* Quick Access Menu */}
        <div className="mobile-container">
          <div className="quick-access-grid">
            <div 
              onClick={() => ionRouter.push('/activities')}
              className="quick-access-item"
              style={{ background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)' }}
            >
              <div className="quick-access-icon">📋</div>
              <span className="quick-access-label">Activity</span>
            </div>
            <div 
              onClick={() => ionRouter.push('/messages')}
              className="quick-access-item"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}
            >
              <div className="quick-access-icon">💬</div>
              <span className="quick-access-label">Messages</span>
            </div>
          </div>
        </div>

        {/* Tab Segment */}
        <div className="mobile-container">
          <IonSegment 
            value={selectedTab} 
            onIonChange={e => setSelectedTab(e.detail.value as string)}
            style={{ '--background': 'transparent' }}
          >
            <IonSegmentButton value="active" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px' } as any}>
              <IonLabel>Active</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="completed" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px' } as any}>
              <IonLabel>Completed</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Active Orders */}
        {selectedTab === 'active' && (
          <div className="mobile-container">
            {activeOrders.length === 0 ? (
              <div className="empty-state-container">
                <p className="text-base">No active orders</p>
              </div>
            ) : (
              activeOrders.map(order => (
                <IonCard key={order.id} className="mobile-card" style={{ margin: '0 0 12px' }}>
                  <IonCardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>
                          {order.stallName}
                        </h3>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--ion-text-color-secondary)' }}>
                          {order.customerName}
                        </p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>

                    <div style={{ padding: '12px', background: 'var(--ion-background-color)', borderRadius: '8px', marginBottom: '12px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--ion-text-color-secondary)' }}>
                        <IonIcon icon={timeOutline} style={{ fontSize: '16px' }} />
                        Estimated: {order.estimatedTime}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ion-text-color-secondary)' }}>
                        <IonIcon icon={navigateOutline} style={{ fontSize: '16px' }} />
                        {order.deliveryAddress}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                      <div 
                        onClick={() => {
                          navigator.clipboard.writeText(order.customerNumber);
                          alert(`Number copied: ${order.customerNumber}`);
                        }}
                        className="quick-access-item"
                        style={{
                          flex: 1,
                          background: 'var(--ion-background-color)',
                          border: '1px solid #F59E0B',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Customer Number</p>
                        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#F59E0B', fontWeight: 700 }}>
                          📱 {order.customerNumber}
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: '10px', color: 'var(--ion-text-color-secondary)', fontStyle: 'italic' }}>Tap to copy</p>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))
            )}
          </div>
        )}

        {/* Completed Orders */}
        {selectedTab === 'completed' && (
          <div className="mobile-container">
            {completedOrders.map(order => (
              <IonCard key={order.id} className="mobile-card" style={{ margin: '0 0 12px' }}>
                <IonCardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>
                        {order.stallName}
                      </h3>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--ion-text-color-secondary)' }}>
                        {order.customerName}
                      </p>
                      <div
                        onClick={() => {
                          navigator.clipboard.writeText(order.customerNumber);
                          alert(`Number copied: ${order.customerNumber}`);
                        }}
                        style={{ margin: '8px 0 0', cursor: 'pointer' }}
                      >
                        <p style={{ margin: '0', fontSize: '12px', color: '#F59E0B', fontWeight: 600, textDecoration: 'underline' }}>
                          📱 {order.customerNumber}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: '10px', color: 'var(--ion-text-color-secondary)', fontStyle: 'italic' }}>
                          Tap to copy
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <IonBadge style={{ '--background': '#10B981', color: 'white', marginRight: '8px' }}>
                        ✓ Delivered
                      </IonBadge>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
                        {order.completedAt}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--ion-background-color)', borderRadius: '8px' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Customer Rating</p>
                      <p style={{ margin: '4px 0 0', fontSize: '16px', color: 'var(--ion-text-color)', fontWeight: 700 }}>
                        ★ {order.rating}
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Earned</p>
                      <p style={{ margin: '4px 0 0', fontSize: '16px', color: '#F59E0B', fontWeight: 700 }}>
                        ₱{order.fee}
                      </p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNav type="rider" activeTab="orders" />
      </IonContent>
    </IonPage>
  );
};

export default RiderOrders;
