// src/pages/User/Cart.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { locationOutline, bicycleOutline, cardOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem';
import UserNavBar from '../../components/Navbar/UserNavBar';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/mobile-first-responsive.css';

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
      <UserNavBar title="My Cart" showCart={true} cartCount={itemCount} />

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Page Title */}
        <div className="mobile-container-lg">
          <h2 className="mobile-h2" style={{ 
            margin: '8px 0 12px 0',
            color: 'var(--ion-text-color)',
            fontWeight: 700,
            fontSize: '18px'
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
            padding: '16px 12px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--ion-card-background)',
              border: '2px solid var(--ion-border-color)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <IonIcon icon={bicycleOutline} style={{ fontSize: '35px', color: '#6366F1' }} />
            </div>
            <h2 className="mobile-h3" style={{ margin: '0 0 6px', fontWeight: 700, color: 'var(--ion-text-color)', fontSize: '14px' }}>Your cart is empty</h2>
            <p className="mobile-body" style={{ margin: 0, color: 'var(--ion-text-color-secondary)', fontSize: '12px' }}>Add some delicious food to get started!</p>
            <IonButton
              style={{ 
                marginTop: '16px',
                '--background': '#6366F1',
                '--border-radius': '6px',
                '--padding-start': '16px',
                '--padding-end': '16px',
                height: '36px',
                fontSize: '12px'
              }}
              onClick={() => history.push('/user/home')}
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
              gap: '8px',
              padding: '10px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--ion-background-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--ion-border-color)',
                flexShrink: 0
              }}>
                <IonIcon icon={locationOutline} style={{ color: '#6366F1', fontSize: '16px' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 1px', fontSize: '10px', color: 'var(--ion-text-color-secondary)' }}>Deliver to</p>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--ion-text-color)', fontSize: '12px' }}>Current Location</p>
              </div>
              <IonButton fill="clear" size="small" style={{ '--color': '#6366F1', '--padding-start': '4px', '--padding-end': '4px', fontSize: '11px' }} onClick={() => history.push('/user/location')}>
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
              margin: '8px 12px 90px 12px',
              padding: '10px'
            }}>
              <h3 style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '13px', color: 'var(--ion-text-color)' }}>Bill Details</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Subtotal</span>
                <span style={{ color: 'var(--ion-text-color)', fontWeight: 500 }}>₱{total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Delivery Fee</span>
                <span style={{ color: 'var(--ion-text-color)', fontWeight: 500 }}>₱{deliveryFee.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                <span style={{ color: 'var(--ion-text-color-secondary)' }}>Service Fee</span>
                <span style={{ color: 'var(--ion-text-color)', fontWeight: 500 }}>₱{serviceFee.toFixed(2)}</span>
              </div>
              
              <div style={{ 
                borderTop: '1px solid var(--ion-border-color)', 
                paddingTop: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '14px',
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
        <div style={{ '--background': 'var(--ion-card-background)', padding: '12px', borderTop: '1px solid var(--ion-border-color)' } as any}>
          <IonButton
            expand="block"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              '--box-shadow': '0 4px 12px rgba(99, 102, 241, 0.2)',
              height: '44px',
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
