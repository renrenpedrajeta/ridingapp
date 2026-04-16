// src/pages/Rider/Home.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonToggle,
} from '@ionic/react';
import { mapOutline, cashOutline, checkmarkCircleOutline, navigateOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

const RiderHome: React.FC = () => {
  const ionRouter = useIonRouter();
  const { getAuthUser } = useAuth();

  const currentRider = getAuthUser('rider');

  if (!currentRider) {
    ionRouter.push('/rider/login');
    return null;
  }
  const [isAvailable, setIsAvailable] = useState(false);
  const [earnings, setEarnings] = useState(450.50);
  const [completedDeliveries, setCompletedDeliveries] = useState(12);
  const [rating, setRating] = useState(4.8);

  const availableOrders = [
    {
      id: '1',
      stallName: 'Burger King',
      customerName: 'John Doe',
      distance: '2.3 km',
      fee: 45,
      pickupLocation: 'BGC, Taguig',
      deliveryLocation: 'Fort Bonifacio, Taguig',
    },
    {
      id: '2',
      stallName: 'Sushi Master',
      customerName: 'Jane Smith',
      distance: '1.8 km',
      fee: 38,
      pickupLocation: 'Makati, Manila',
      deliveryLocation: 'Paseo de Santa Rosa, Manila',
    },
    {
      id: '3',
      stallName: 'Pizza Palace',
      customerName: 'Mike Johnson',
      distance: '3.1 km',
      fee: 52,
      pickupLocation: 'Quezon City',
      deliveryLocation: 'San Juan, Metro Manila',
    },
  ];

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

        {/* Status Toggle */}
        <div className="mobile-container">
          <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--ion-text-color)', fontWeight: 700 }}>
                    {isAvailable ? 'Online' : 'Offline'}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--ion-text-color-secondary)' }}>
                    {isAvailable ? 'Ready to accept orders' : 'Tap to go online'}
                  </p>
                </div>
                <IonToggle 
                  checked={isAvailable} 
                  onIonChange={(e) => setIsAvailable(e.detail.checked)}
                  style={{ '--background-checked': '#F59E0B' }}
                />
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Quick Stats */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <div className="responsive-grid-2" style={{ gap: '12px' }}>
            <IonCard style={{ margin: 0, background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)' }}>
              <IonCardContent style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="icon-container-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <IonIcon icon={cashOutline} style={{ fontSize: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Today's Earnings</p>
                    <h4 style={{ margin: '4px 0 0', color: 'white', fontWeight: 700 }}>₱{earnings.toFixed(2)}</h4>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard style={{ margin: 0, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>
              <IonCardContent style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="icon-container-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Completed Today</p>
                    <h4 style={{ margin: '4px 0 0', color: 'white', fontWeight: 700 }}>{completedDeliveries}</h4>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        {/* Rating */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
            <IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--ion-text-color-secondary)' }}>Current Rating</p>
                  <h3 style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 700 }}>★ {rating}</h3>
                </div>
                <IonBadge color="light" style={{ fontSize: '13px', padding: '6px 12px' }}>Excellent</IonBadge>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Available Orders */}
        {isAvailable && (
          <>
            <div className="mobile-container" style={{ paddingTop: '0' }}>
              <h2 className="section-title" style={{ margin: '16px 0 12px 0' }}>
                Available Orders
              </h2>
            </div>

            <div className="mobile-container" style={{ paddingTop: '0' }}>
              {availableOrders.map(order => (
                <IonCard key={order.id} className="mobile-card" style={{ margin: '0 0 12px 0' }}>
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
                      <IonBadge color="light" style={{ '--background': '#F59E0B', color: 'white', fontWeight: 700 }}>
                        ₱{order.fee}
                      </IonBadge>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '14px', color: 'var(--ion-text-color-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IonIcon icon={mapOutline} style={{ fontSize: '16px' }} />
                        {order.distance}
                      </span>
                    </div>

                    <div style={{ padding: '12px', background: 'var(--ion-background-color)', borderRadius: '8px', marginBottom: '12px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <IonIcon icon={navigateOutline} style={{ fontSize: '14px', color: '#F59E0B' }} />
                        <div>
                          <p style={{ margin: 0, color: 'var(--ion-text-color-secondary)' }}>From:</p>
                          <p style={{ margin: 0, color: 'var(--ion-text-color)', fontWeight: 600 }}>{order.pickupLocation}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <IonIcon icon={navigateOutline} style={{ fontSize: '14px', color: '#10B981' }} />
                        <div>
                          <p style={{ margin: 0, color: 'var(--ion-text-color-secondary)' }}>To:</p>
                          <p style={{ margin: 0, color: 'var(--ion-text-color)', fontWeight: 600 }}>{order.deliveryLocation}</p>
                        </div>
                      </div>
                    </div>

                    <IonButton 
                      expand="block"
                      className="mobile-button"
                      style={{ '--background': '#F59E0B', margin: 0 }}
                      onClick={() => ionRouter.push(`/rider/orders/${order.id}`)}
                    >
                      Accept Order
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          </>
        )}

        {!isAvailable && (
          <div className="empty-state-container">
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔴</div>
            <p className="empty-state-text">You're currently offline</p>
            <p className="empty-state-description">
              Toggle above to go online and start accepting orders
            </p>
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNav type="rider" activeTab="home" />
      </IonContent>
    </IonPage>
  );
};

export default RiderHome;
