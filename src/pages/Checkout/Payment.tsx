// src/pages/Checkout/Payment.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonCheckbox,
  IonRadio,
  IonRadioGroup,
} from '@ionic/react';
import { arrowBack, cardOutline, phonePortraitOutline, walletOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Payment: React.FC = () => {
  const history = useHistory();
  const { total, items, clearCart } = useCart();
  const { isGuest } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const deliveryFee = 2.99;
  const serviceFee = 1.49;
  const finalTotal = total + deliveryFee + serviceFee;

  const handlePayment = async () => {
    setLoading(true);
    
    // Create order object
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: items,
      subtotal: total,
      deliveryFee: deliveryFee,
      serviceFee: serviceFee,
      total: finalTotal,
      paymentMethod: paymentMethod,
      status: 'pending',
      vendorStatus: 'received', // vendor is preparing
      riderStatus: 'waiting', // rider waiting to pick up
      timestamp: new Date().toISOString(),
      deliveryAddress: sessionStorage.getItem('locationName') || 'Delivery Location',
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      sessionStorage.removeItem('selectedLocation');
      sessionStorage.removeItem('locationName');
      
      // Route based on user type
      if (isGuest) {
        history.push('/order-success', { orderId: newOrder.id });
      } else {
        history.push('/order-success', { orderId: newOrder.id });
      }
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Payment</span>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ padding: '16px', paddingBottom: '200px' }}>
          {/* Order Summary */}
          <div
            style={{
              background: 'var(--ion-card-background)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--ion-border-color)',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontWeight: 700, fontSize: '16px', color: 'var(--ion-text-color)' }}>
              Order Summary
            </h3>

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

            <div
              style={{
                borderTop: '1px solid var(--ion-border-color)',
                marginTop: '12px',
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '18px',
                color: 'var(--ion-text-color)',
              }}
            >
              <span>Total</span>
              <span style={{ color: '#6366F1' }}>₱{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
              Payment Method
            </label>
            <IonSegment
              value={paymentMethod}
              onIonChange={e => setPaymentMethod(e.detail.value as string)}
              style={{ '--background': 'var(--ion-card-background)' }}
            >
              <IonSegmentButton
                value="card"
                style={{
                  '--color': 'var(--ion-text-color-secondary)',
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#6366F1',
                }}
              >
                <IonIcon icon={cardOutline} />
                <span style={{ marginLeft: '8px' }}>Card</span>
              </IonSegmentButton>
              <IonSegmentButton
                value="gcash"
                style={{
                  '--color': 'var(--ion-text-color-secondary)',
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#6366F1',
                }}
              >
                <IonIcon icon={phonePortraitOutline} />
                <span style={{ marginLeft: '8px' }}>GCash</span>
              </IonSegmentButton>
              <IonSegmentButton
                value="wallet"
                style={{
                  '--color': 'var(--ion-text-color-secondary)',
                  '--color-checked': '#FFFFFF',
                  '--background-checked': '#6366F1',
                }}
              >
                <IonIcon icon={walletOutline} />
                <span style={{ marginLeft: '8px' }}>Wallet</span>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: 'var(--ion-text-color)' }}>
                Card Details
              </h4>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
                  Card Number
                </label>
                <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                  <IonIcon icon={cardOutline} slot="start" color="primary" />
                  <IonInput
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onIonChange={e => setCardDetails({...cardDetails, cardNumber: e.detail.value!})}
                    style={{ '--color': 'var(--ion-text-color)' } as any}
                  />
                </IonItem>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
                  Card Holder
                </label>
                <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                  <IonInput
                    placeholder="John Doe"
                    value={cardDetails.cardHolder}
                    onIonChange={e => setCardDetails({...cardDetails, cardHolder: e.detail.value!})}
                    style={{ '--color': 'var(--ion-text-color)' } as any}
                  />
                </IonItem>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
                    Expiry Date
                  </label>
                  <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                    <IonInput
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onIonChange={e => setCardDetails({...cardDetails, expiryDate: e.detail.value!})}
                      style={{ '--color': 'var(--ion-text-color)' } as any}
                    />
                  </IonItem>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
                    CVV
                  </label>
                  <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                    <IonInput
                      placeholder="123"
                      type="password"
                      value={cardDetails.cvv}
                      onIonChange={e => setCardDetails({...cardDetails, cvv: e.detail.value!})}
                      style={{ '--color': 'var(--ion-text-color)' } as any}
                    />
                  </IonItem>
                </div>
              </div>

              <IonItem lines="none" style={{ '--background': 'transparent', marginTop: '12px' } as any}>
                <IonCheckbox
                  slot="start"
                  checked={saveCard}
                  onIonChange={e => setSaveCard(e.detail.checked)}
                  style={{ '--checkbox-background-checked': '#6366F1', '--border-color-checked': '#6366F1' } as any}
                />
                <IonLabel style={{ fontSize: '13px', color: 'var(--ion-text-color)' }}>Save card for future use</IonLabel>
              </IonItem>
            </div>
          )}

          {/* GCash Payment */}
          {paymentMethod === 'gcash' && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: 'var(--ion-text-color)' }}>
                GCash Number
              </h4>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
                  Phone Number
                </label>
                <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                  <IonIcon icon={phonePortraitOutline} slot="start" color="primary" />
                  <IonInput
                    placeholder="+63 9XX XXX XXXX"
                    value={phoneNumber}
                    onIonChange={e => setPhoneNumber(e.detail.value!)}
                    style={{ '--color': 'var(--ion-text-color)' } as any}
                  />
                </IonItem>
              </div>
            </div>
          )}

          {/* Wallet Payment */}
          {paymentMethod === 'wallet' && (
            <div
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                color: 'white',
              }}
            >
              <p style={{ margin: '0 0 8px', fontSize: '12px', opacity: 0.9 }}>Available Balance</p>
              <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>₱5,000.00</h3>
            </div>
          )}
        </div>
      </IonContent>

      {/* Footer */}
      <IonFooter
        style={{
          '--background': 'var(--ion-card-background)',
          padding: '16px',
          borderTop: '1px solid var(--ion-border-color)',
        } as any}
      >
        <IonButton
          expand="block"
          size="large"
          style={{
            '--background': '#6366F1',
            '--border-radius': '8px',
            height: '48px',
            fontSize: '16px',
            fontWeight: 700,
          }}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ₱${finalTotal.toFixed(2)}`}
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Payment;
