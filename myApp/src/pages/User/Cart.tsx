// src/pages/User/Cart.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { locationOutline, bicycleOutline, cardOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem';
import PageHeader from '../../components/PageHeader';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const UserCart: React.FC = () => {
  const history = useHistory();
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();

  // Protect this page - redirect if not logged in
  if (!user || (user.role !== 'user' && user.role !== 'rider')) {
    history.replace('/login');
    return null;
  }

  const deliveryFee = 2.99;
  const serviceFee = 1.49;
  const finalTotal = total + deliveryFee + serviceFee;

  const handleCheckout = () => {
    history.push('/checkout/payment');
  };

  return (
    <IonPage>
      <PageHeader 
        showLogo={true}
        showBackButton={true}
        backHref="/user/home"
        cartCount={itemCount}
        onCartClick={() => history.push('/user/cart')}
        onHomeClick={() => history.push('/user/home')}
        isLoggedIn={true}
        onProfileClick={() => history.push('/user/profile')}
        onSettingsClick={() => history.push('/user/settings')}
        onLogoutClick={() => {
          logout();
          history.push('/guest/home');
        }}
      />

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Page Title */}
        <div style={{ padding: '20px 16px 16px 16px' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '28px', 
            fontWeight: 700, 
            color: 'var(--ion-text-color)' 
          }}>
            Your Cart
          </h2>
        </div>
        {items.length === 0 ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '60vh',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'var(--ion-card-background)',
              border: '2px solid var(--ion-border-color)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <IonIcon icon={bicycleOutline} style={{ fontSize: '48px', color: '#6366F1' }} />
            </div>
            <h2 style={{ margin: '0 0 8px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Your cart is empty</h2>
            <p style={{ margin: 0, color: 'var(--ion-text-color-secondary)' }}>Add some delicious food to get started!</p>
            <IonButton
              style={{ 
                marginTop: '24px',
                '--background': '#6366F1',
                '--border-radius': '8px'
              }}
              onClick={() => history.push('/user/home')}
            >
              Browse Stalls
            </IonButton>
          </div>
        ) : (
          <>
            {/* Delivery Address */}
            <div style={{ 
              background: 'var(--ion-card-background)', 
              margin: '16px', 
              padding: '16px', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--ion-border-color)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--ion-background-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--ion-border-color)'
              }}>
                <IonIcon icon={locationOutline} style={{ color: '#6366F1', fontSize: '20px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Deliver to</p>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--ion-text-color)' }}>Current Location</p>
              </div>
              <IonButton fill="clear" style={{ '--color': '#6366F1' }} onClick={() => history.push('/user/location')}>Change</IonButton>
            </div>

            {/* Cart Items */}
            <div style={{ padding: '0 16px' }}>
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
            <div style={{ 
              background: 'var(--ion-card-background)', 
              margin: '16px', 
              padding: '16px', 
              borderRadius: '12px',
              border: '1px solid var(--ion-border-color)',
              marginBottom: '100px'
            }}>
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
                fontSize: '18px',
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
            size="large"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              '--box-shadow': '0 4px 20px rgba(99, 102, 241, 0.3)',
              height: '56px',
              fontSize: '16px',
              fontWeight: 700
            }}
            onClick={handleCheckout}
          >
            <IonIcon slot="start" icon={cardOutline} />
            Proceed to Checkout • ₱{finalTotal.toFixed(2)}
          </IonButton>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default UserCart;
