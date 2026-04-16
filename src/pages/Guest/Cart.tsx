// src/pages/Guest/Cart.tsx
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
} from '@ionic/react';
import { locationOutline, bicycleOutline, cardOutline, arrowBack } from 'ionicons/icons';
import { useAppNavigate } from '../../context/useAppNavigate';
import CartItem from '../../components/Cart/CartItem';
import LogoHeader from '../../components/LogoHeader';
import GuestPromptModal from '../../components/Auth/GuestPromptModal';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const GuestCart: React.FC = () => {
  const { navigate, goBack } = useAppNavigate();
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { isGuest, logout } = useAuth();
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('Current Location');

  useEffect(() => {
    const locationName = sessionStorage.getItem('locationName');
    if (locationName) {
      setSelectedLocation(locationName);
    }
  }, []);

  const deliveryFee = 2.99;
  const serviceFee = 1.49;
  
  const finalTotal = total + deliveryFee + serviceFee;

  const handleCheckout = () => {
    if (isGuest) {
      setShowGuestPrompt(true);
    } else {
      navigate('/checkout');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="guest-cart-content">
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
                '--border-radius': '8px',
                marginTop: '8px'
              }}
              onClick={() => navigate('/guest/home')}
            >
              Browse Stalls
            </IonButton>
          </div>
        ) : (
          <>
            {/* Delivery Address */}
            <div className="mobile-card-lg" style={{ margin: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="icon-container-sm" style={{ background: 'var(--ion-background-color)', border: '1px solid var(--ion-border-color)' }}>
                <IonIcon icon={locationOutline} style={{ color: '#6366F1', fontSize: '18px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Deliver to</p>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--ion-text-color)', fontSize: '14px' }}>{selectedLocation}</p>
              </div>
              <IonButton fill="clear" style={{ '--color': '#6366F1' }}               onClick={() => navigate('/guest/location')}>Change</IonButton>
            </div>

            {/* Cart Items */}
            <div className="cart-items-mobile" style={{ padding: '0 16px' }}>
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
            <div className="mobile-card-lg" style={{ margin: '16px', marginBottom: '100px' }}>
              <h3 style={{ margin: '0 0 16px', fontWeight: 700, fontSize: '16px', color: 'var(--ion-text-color)' }}>Bill Details</h3>
              
              <IonItem lines="none" style={{ '--padding-start': 0, '--inner-padding-end': 0, '--background': 'transparent' } as any}>
                <IonLabel style={{ color: 'var(--ion-text-color)' }}>Subtotal</IonLabel>
                <span slot="end" style={{ color: 'var(--ion-text-color)' }}>₱{total.toFixed(2)}</span>
              </IonItem>
              <IonItem lines="none" style={{ '--padding-start': 0, '--inner-padding-end': 0, '--background': 'transparent' } as any}>
                <IonLabel style={{ color: 'var(--ion-text-color)' }}>Delivery Fee</IonLabel>
                <span slot="end" style={{ color: 'var(--ion-text-color)' }}>₱{deliveryFee.toFixed(2)}</span>
              </IonItem>
              <IonItem lines="none" style={{ '--padding-start': 0, '--inner-padding-end': 0, '--background': 'transparent' } as any}>
                <IonLabel style={{ color: 'var(--ion-text-color)' }}>Service Fee</IonLabel>
                <span slot="end" style={{ color: 'var(--ion-text-color)' }}>₱{serviceFee.toFixed(2)}</span>
              </IonItem>
              
              <div style={{ 
                borderTop: '1px solid var(--ion-border-color)', 
                marginTop: '12px', 
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
        <IonFooter style={{ '--background': 'var(--ion-card-background)', padding: '16px', borderTop: '1px solid var(--ion-border-color)' } as any}>
          <IonButton
            expand="block"
            className="mobile-button"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              '--box-shadow': '0 4px 20px rgba(99, 102, 241, 0.3)',
              fontSize: '15px',
              fontWeight: 700
            }}
            onClick={handleCheckout}
          >
            <IonIcon slot="start" icon={cardOutline} />
            Proceed to Checkout • ₱{finalTotal.toFixed(2)}
          </IonButton>
        </IonFooter>
      )}

      <GuestPromptModal 
        isOpen={showGuestPrompt} 
        onClose={() => setShowGuestPrompt(false)} 
      />
    </IonPage>
  );
};

export default GuestCart;
