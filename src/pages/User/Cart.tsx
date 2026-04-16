// src/pages/User/Cart.tsx
import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
} from '@ionic/react';
import { locationOutline, bicycleOutline, cardOutline, arrowBack } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import CartItem from '../../components/Cart/CartItem';
import LogoHeader from '../../components/LogoHeader';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

const UserCart: React.FC = () => {
  const ionRouter = useIonRouter();
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { getAuthUser } = useAuth();

  const currentUser = getAuthUser('user');

  // Protect this page - redirect if not logged in
  if (!currentUser) {
    ionRouter.push('/login');
    return null;
  }

  const deliveryFee = 2.99;
  const serviceFee = 1.49;
  const finalTotal = total + deliveryFee + serviceFee;

  const handleCheckout = () => {
    ionRouter.push('/checkout/payment');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => ionRouter.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-with-sticky-footer" style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Logo Header */}
        <LogoHeader />

        {items.length === 0 ? (
          <div className="empty-state-container">
            <div className="icon-container" style={{ background: 'var(--ion-card-background)', border: '2px solid var(--ion-border-color)' }}>
              <IonIcon icon={bicycleOutline} style={{ fontSize: '28px', color: '#6366F1' }} />
            </div>
            <h2 className="empty-state-text">Your cart is empty</h2>
            <p className="empty-state-description">Add some delicious food to get started!</p>
            <IonButton
              className="mobile-button"
              style={{ 
                '--background': '#6366F1',
                '--border-radius': '6px',
                marginTop: '8px'
              }}
              onClick={() => ionRouter.push('/user/home')}
            >
              Browse Stalls
            </IonButton>
          </div>
        ) : (
          <>
            {/* Delivery Address */}
            <div className="mobile-card" style={{ 
              margin: '10px 12px 8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px'
            }}>
              <div className="icon-container-sm" style={{ background: 'var(--ion-background-color)', border: '1px solid var(--ion-border-color)' }}>
                <IonIcon icon={locationOutline} style={{ color: '#6366F1', fontSize: '16px' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Deliver to</p>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--ion-text-color)', fontSize: '14px' }}>Current Location</p>
              </div>
              <IonButton fill="clear" size="small" style={{ '--color': '#6366F1', fontSize: '12px' }} onClick={() => ionRouter.push('/user/location')}>
                Change
              </IonButton>
            </div>

            {/* Cart Items */}
            <div className="cart-items-mobile" style={{ padding: '0 12px' }}>
              {items.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            {/* Bill Details */}
            <div className="mobile-card-lg" style={{ 
              margin: '8px 12px 100px 12px',
              padding: '12px'
            }}>
              <h3 style={{ margin: '0 0 12px', fontWeight: 700, fontSize: '14px', color: 'var(--ion-text-color)' }}>Bill Details</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Subtotal</span>
                <span style={{ color: 'var(--ion-text-color)', fontWeight: 500 }}>₱{total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Delivery Fee</span>
                <span style={{ color: 'var(--ion-text-color)', fontWeight: 500 }}>₱{deliveryFee.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Service Fee</span>
                <span style={{ color: 'var(--ion-text-color)', fontWeight: 500 }}>₱{serviceFee.toFixed(2)}</span>
              </div>
              
              <div style={{ 
                borderTop: '1px solid var(--ion-border-color)', 
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--ion-text-color)'
              }}>
                <span>Total</span>
                <span style={{ color: '#6366F1' }}>₱{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}

      </IonContent>

      {/* Footer Checkout Button */}
      {items.length > 0 && (
        <div style={{ '--background': 'var(--ion-card-background)', padding: '12px 16px', borderTop: '1px solid var(--ion-border-color)' } as any}>
          <IonButton
            expand="block"
            className="mobile-button"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              '--box-shadow': '0 4px 12px rgba(99, 102, 241, 0.2)',
              fontSize: '14px',
              fontWeight: 600
            }}
            onClick={handleCheckout}
          >
            <IonIcon slot="start" icon={cardOutline} />
            Checkout • ₱{finalTotal.toFixed(2)}
          </IonButton>
        </div>
      )}
    </IonPage>
  );
};

export default UserCart;
