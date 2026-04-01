// src/pages/OrderSuccess/OrderSuccess.tsx
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { checkmarkCircleOutline, locationOutline, time, bicycle } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

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
  paymentMethod: string;
  status: string;
  vendorStatus: string;
  riderStatus: string;
  timestamp: string;
  deliveryAddress: string;
}

const OrderSuccess: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { isGuest } = useAuth();
  const { isDarkMode } = useTheme();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orderId = (location.state as any)?.orderId;
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [location]);

  if (!order) {
    return (
      <IonPage>
        <IonContent>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Loading order details...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const formattedDate = new Date(order.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleContinue = () => {
    if (isGuest) {
      history.push('/guest/home');
    } else {
      history.push('/user/orders');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonTitle>Order Confirmation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-with-sticky-footer" style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div className="mobile-container">
          {/* Success Icon */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}>
              <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '48px', color: 'white' }} />
            </div>
            <h1 style={{ margin: '16px 0 8px', fontSize: '28px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Order Placed!</h1>
            <p style={{ margin: '0 0 24px', color: 'var(--ion-text-color-secondary)', fontSize: '16px' }}>Your order has been received</p>
          </div>

          {/* Order ID Card */}
          <IonCard style={{ marginBottom: '16px' }}>
            <IonCardContent>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase' }}>Order ID</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--ion-text-color)' }}>{order.id}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase' }}>Order Time</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--ion-text-color)' }}>{formattedDate}</p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase' }}>Payment Method</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--ion-text-color)', textTransform: 'capitalize' }}>{order.paymentMethod}</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Ordered Items */}
          <IonCard style={{ marginBottom: '16px' }}>
            <IonCardContent>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Ordered Items</h3>
              <div>
                {order.items.map((item, index) => (
                  <div 
                    key={index} 
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: index < order.items.length - 1 ? '1px solid var(--ion-border-color)' : 'none',
                      marginBottom: index < order.items.length - 1 ? '12px' : '0',
                    }}
                  >
                    <div>
                      <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: 'var(--ion-text-color)' }}>
                        {item.name} x{item.quantity}
                      </p>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--ion-text-color)' }}>
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </IonCardContent>
          </IonCard>

          {/* Order Summary */}
          <IonCard style={{ marginBottom: '16px' }}>
            <IonCardContent>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--ion-border-color)' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Subtotal</span>
                <span style={{ color: 'var(--ion-text-color)' }}>₱{order.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--ion-border-color)' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Delivery Fee</span>
                <span style={{ color: 'var(--ion-text-color)' }}>₱{order.deliveryFee.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid var(--ion-border-color)' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Service Fee</span>
                <span style={{ color: 'var(--ion-text-color)' }}>₱{order.serviceFee.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px' }}>
                <span style={{ color: 'var(--ion-text-color)' }}>Total</span>
                <span style={{ color: '#6366F1' }}>₱{order.total.toFixed(2)}</span>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Delivery Details */}
          <IonCard style={{ marginBottom: '16px' }}>
            <IonCardContent>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Delivery Details</h3>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <IonIcon icon={locationOutline} style={{ fontSize: '20px', color: '#6366F1', minWidth: '20px' }} />
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Delivery Address</p>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--ion-text-color)', fontWeight: 600 }}>{order.deliveryAddress}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <IonIcon icon={time} style={{ fontSize: '20px', color: '#F59E0B', minWidth: '20px' }} />
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Estimated Delivery</p>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--ion-text-color)', fontWeight: 600 }}>25-35 minutes</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <IonIcon icon={bicycle} style={{ fontSize: '20px', color: '#10B981', minWidth: '20px' }} />
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Driver Status</p>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--ion-text-color)', fontWeight: 600 }}>Looking for driver</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gap: '12px', marginBottom: '40px' }}>
            <IonButton
              expand="block"
              color="primary"
              fill="solid"
              style={{ '--background': '#6366F1', height: '48px', fontSize: '16px', fontWeight: 700 }}
              onClick={handleContinue}
            >
              Track Order
            </IonButton>
            <IonButton
              expand="block"
              color="medium"
              fill="outline"
              style={{ height: '48px', fontSize: '16px', fontWeight: 700 }}
              onClick={() => {
                if (isGuest) {
                  history.push('/guest/home');
                } else {
                  history.push('/user/home');
                }
              }}
            >
              Continue Shopping
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderSuccess;
