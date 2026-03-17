// src/pages/Checkout/Checkout.tsx
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { arrowBack, locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface DeliveryLocation {
  lat: number;
  lng: number;
  name: string;
}

const Checkout: React.FC = () => {
  const history = useHistory();
  const { items, total, clearCart } = useCart();
  const { isDarkMode } = useTheme();
  
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Mock restaurant location
  const restaurantLocation: DeliveryLocation = {
    lat: 14.5995,
    lng: 120.9842,
    name: 'Restaurant Location'
  };
  
  // Customer location from sessionStorage
  const [customerLocation, setCustomerLocation] = useState<DeliveryLocation | null>(null);

  useEffect(() => {
    const savedLocation = sessionStorage.getItem('selectedLocation');
    const savedLocationName = sessionStorage.getItem('locationName');
    
    if (savedLocation) {
      try {
        const loc = JSON.parse(savedLocation);
        setCustomerLocation({
          lat: loc.lat,
          lng: loc.lng,
          name: savedLocationName || 'Delivery Location'
        });
        setDeliveryAddress(savedLocationName || `${loc.lat}, ${loc.lng}`);
      } catch (e) {
        console.error('Error parsing location:', e);
      }
    }
  }, []);

  const deliveryFee = 2.99;
  const serviceFee = 1.49;
  const finalTotal = total + deliveryFee + serviceFee;

  const handlePayment = async () => {
    if (!deliveryAddress || !customerName || !phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      alert('Order placed successfully! Your food will be delivered soon.');
      history.push('/user/home');
    }, 2000);
  };

  const handleLocationPicker = () => {
    history.push('/guest/location');
  };

  return (
    <IonPage style={{ '--background': 'var(--ion-background-color)' } as any}>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '20px 16px' }}>
          {/* Order Summary */}
          <IonCard style={{ marginBottom: '20px' }}>
            <IonCardContent>
              <h3 style={{ margin: '0 0 16px 0', color: 'var(--ion-text-color)', fontWeight: 700 }}>Order Summary</h3>
              <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--ion-border-color)' }}>
                    <span style={{ color: 'var(--ion-text-color)' }}>{item.name} x{item.quantity}</span>
                    <span style={{ color: 'var(--ion-text-color)', fontWeight: 600 }}>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '2px solid var(--ion-border-color)', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--ion-text-color-secondary)', fontSize: '14px' }}>
                  <span>Subtotal:</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--ion-text-color-secondary)', fontSize: '14px' }}>
                  <span>Delivery Fee:</span>
                  <span>₱{deliveryFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--ion-text-color-secondary)', fontSize: '14px' }}>
                  <span>Service Fee:</span>
                  <span>₱{serviceFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--ion-border-color)', color: 'var(--ion-text-color)', fontWeight: 700, fontSize: '16px' }}>
                  <span>Total:</span>
                  <span>₱{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Delivery Map */}
          {customerLocation && (
            <IonCard style={{ marginBottom: '20px' }}>
              <IonCardContent style={{ padding: 0 }}>
                <h3 style={{ margin: '16px 16px 0 16px', color: 'var(--ion-text-color)', fontWeight: 700 }}>Delivery Route</h3>
                <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', margin: '12px' }}>
                  <MapContainer 
                    center={[restaurantLocation.lat, restaurantLocation.lng]} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url={isDarkMode ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                      attribution={isDarkMode ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                    />
                    {/* Restaurant Marker */}
                    <Marker
                      position={[restaurantLocation.lat, restaurantLocation.lng]}
                      icon={L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                      })}
                    >
                      <Popup>Restaurant Location</Popup>
                    </Marker>
                    {/* Customer Marker */}
                    <Marker
                      position={[customerLocation.lat, customerLocation.lng]}
                      icon={L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                      })}
                    >
                      <Popup>Delivery Location</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {/* Address Section */}
          <IonCard style={{ marginBottom: '20px' }}>
            <IonCardContent>
              <h3 style={{ margin: '0 0 16px 0', color: 'var(--ion-text-color)', fontWeight: 700 }}>Delivery Address</h3>
              
              <IonItem lines="none" style={{ '--background': 'var(--ion-color-background)' } as any}>
                <IonLabel position="stacked" style={{ color: 'var(--ion-text-color-secondary)' }}>Your Name *</IonLabel>
                <IonInput
                  type="text"
                  placeholder="Enter your name"
                  value={customerName}
                  onIonChange={(e) => setCustomerName(e.detail.value || '')}
                  style={{ color: 'var(--ion-text-color)' }}
                />
              </IonItem>

              <IonItem lines="none" style={{ '--background': 'var(--ion-color-background)' } as any}>
                <IonLabel position="stacked" style={{ color: 'var(--ion-text-color-secondary)' }}>Phone Number *</IonLabel>
                <IonInput
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onIonChange={(e) => setPhoneNumber(e.detail.value || '')}
                  style={{ color: 'var(--ion-text-color)' }}
                />
              </IonItem>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--ion-text-color-secondary)', fontSize: '14px' }}>Delivery Address *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <IonInput
                    type="text"
                    placeholder="Select delivery location"
                    value={deliveryAddress}
                    readonly
                    style={{ color: 'var(--ion-text-color)', '--background': 'var(--ion-background-color)' } as any}
                  />
                  <IonButton color="primary" onClick={handleLocationPicker}>
                    <IonIcon icon={locationOutline} />
                  </IonButton>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>

      <IonFooter>
        <div style={{ padding: '16px', background: 'var(--ion-card-background)', borderTop: '1px solid var(--ion-border-color)' }}>
          <IonButton
            expand="block"
            color="primary"
            fill="solid"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Place Order - ₱${finalTotal.toFixed(2)}`}
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Checkout;
