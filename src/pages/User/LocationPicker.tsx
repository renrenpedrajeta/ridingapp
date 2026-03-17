// src/pages/User/LocationPicker.tsx
import React, { useState, useEffect } from 'react';
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
} from '@ionic/react';
import { locationOutline, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

const LocationPicker: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  // Protect this page - redirect if not logged in
  if (!user || (user.role !== 'user' && user.role !== 'rider')) {
    history.replace('/login');
    return null;
  }

  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
          setAddress(`Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    }
  }, []);

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      sessionStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
      sessionStorage.setItem('locationName', address);
      history.goBack();
    }
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
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Select Delivery Location</span>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ padding: '12px' }}>
          {/* Map Placeholder */}
          <div
            style={{
              width: '100%',
              height: '35vh',
              background: 'var(--ion-card-background)',
              borderRadius: '8px',
              border: '1px solid var(--ion-border-color)',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'var(--ion-text-color-secondary)',
              gap: '8px',
            }}
          >
            {/* <IonIcon icon={locationOutline} style={{ fontSize: '48px', color: '#6366F1' }} />
            <p style={{ margin: 0, textAlign: 'center', fontSize: '14px' }}>
              {loading ? 'Getting your location...' : 'Location acquired'}
            </p> */}
          </div>

          {/* Location Info */}
          {selectedLocation && (
            <div
              style={{
                background: 'var(--ion-card-background)',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--ion-border-color)',
                marginBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <IonIcon
                  icon={locationOutline}
                  style={{ color: '#6366F1', fontSize: '18px', minWidth: '18px' }}
                />
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '10px', color: 'var(--ion-text-color-secondary)' }}>
                    Selected Location
                  </p>
                  <p style={{ margin: '0 0 3px', fontWeight: 600, color: 'var(--ion-text-color)', fontSize: '11px' }}>
                    Lat: {selectedLocation.lat.toFixed(6)}
                  </p>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--ion-text-color)', fontSize: '11px' }}>
                    Lng: {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Address Input */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
              Delivery Address
            </label>
            <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)', '--padding-start': '8px', '--padding-end': '8px', '--min-height': '36px' } as any}>
              <IonIcon icon={locationOutline} slot="start" color="primary" style={{ fontSize: '16px', marginRight: '4px' }} />
              <IonInput
                placeholder="Enter address"
                value={address}
                onIonChange={e => setAddress(e.detail.value!)}
                style={{ '--color': 'var(--ion-text-color)', '--placeholder-color': 'var(--ion-text-color-secondary)', fontSize: '12px' } as any}
              />
            </IonItem>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--ion-text-color-secondary)' }}>
            <p style={{ margin: 0 }}>📍 Location detected. Edit address if needed.</p>
          </div>
        </div>
      </IonContent>

      {/* Footer */}
      {selectedLocation && (
        <IonFooter
          style={{
            '--background': 'var(--ion-card-background)',
            padding: '10px',
            borderTop: '1px solid var(--ion-border-color)',
          } as any}
        >
          <IonButton
            expand="block"
            size="large"
            style={{
              '--background': '#6366F1',
              '--border-radius': '6px',
              height: '40px',
              fontSize: '13px',
              fontWeight: 700,
            }}
            onClick={handleConfirmLocation}
          >
            <IonIcon slot="start" icon={locationOutline} />
            Confirm Location
          </IonButton>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default LocationPicker;
