// src/pages/Guest/LocationPicker.tsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonInput,
  IonItem,
  IonSpinner,
  IonFooter,
} from '@ionic/react';
import { locationOutline, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const geocodeAddress = async (
  address: string
): Promise<{ lat: number; lng: number } | null> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`
    );
    const data = await res.json();
    if (data.length) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (err) {
    console.error('geocode error', err);
  }
  return null;
};

const GuestLocationPicker: React.FC = () => {
  const [pointA, setPointA] = useState<{ lat: number; lng: number } | null>(null);
  const history = useHistory();
  const [addressFrom, setAddressFrom] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchingFrom, setSearchingFrom] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // get user location
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setSelectedLocation(location);
          setPointA(location);
          setAddressFrom(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    // whenever pointA is updated, pan/zoom the map to the new position
    if (pointA && mapRef.current) {
      panTo(pointA);
    }
  }, [pointA]);

  const panTo = (coords: {lat: number; lng: number}) => {
    if (mapRef.current) {
      mapRef.current.flyTo([coords.lat, coords.lng], 15, { duration: 1 });
    }
  };

  const handleSearchFrom = async (value: string) => {
    setAddressFrom(value);
    if (value.length > 2) {
      setSearchingFrom(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search error:', error);
      }
      setSearchingFrom(false);
    }
  };

  const selectSuggestionFrom = (suggestion: any) => {
    const coords = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    };
    setPointA(coords);
    setAddressFrom(suggestion.display_name);
    setShowSuggestions(false);
    panTo(coords);
  };

  const handleBlurOrEnter = async () => {
    if (!showSuggestions && addressFrom.length > 2) {
      const coords = await geocodeAddress(addressFrom);
      if (coords) {
        setPointA(coords);
        panTo(coords);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlurOrEnter();
      console.log('Enter pressed, geocoding address:', addressFrom);
    }
  };
  const handleConfirmLocation = () => {
    if (pointA) {
      sessionStorage.setItem('pointA', JSON.stringify(pointA));
      sessionStorage.setItem('addressFrom', addressFrom);
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
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Plan Your Route</span>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ padding: '16px' }}>
          {/* Search From */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ion-text-color)',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              From
            </label>
            <IonItem
              style={{
                '--background': 'var(--ion-card-background)',
                '--border': '1px solid var(--ion-border-color)',
              } as any}
            >
              <IonIcon icon={locationOutline} slot="start" color="primary" />
              <IonInput
                placeholder="Enter starting location"
                value={addressFrom}
                onIonChange={(e: any) => handleSearchFrom(e.detail.value!)}
                onIonFocus={() =>
                  addressFrom.length > 2 && setShowSuggestions(true)
                }
                onIonBlur={handleBlurOrEnter}
                onKeyDown={handleKeyDown}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
              {searchingFrom && <IonSpinner slot="end" name="dots" />}
            </IonItem>

            {showSuggestions && suggestions.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--ion-card-background)',
                  border: '1px solid var(--ion-border-color)',
                  borderRadius: '8px',
                  marginTop: '4px',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {suggestions.map((suggestion: any, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => selectSuggestionFrom(suggestion)}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid var(--ion-border-color)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: 'var(--ion-text-color)',
                    }}
                  >
                    {suggestion.display_name.split(',').slice(0, 2).join(',')}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map Container */}
          <div
            style={{
              width: '100%',
              height: '40vh',
              background: 'var(--ion-card-background)',
              borderRadius: '12px',
              border: '1px solid var(--ion-border-color)',
              marginBottom: '24px',
              overflow: 'hidden',
            }}
          >
              <MapContainer
                center={[
                  pointA?.lat ?? selectedLocation?.lat ?? 14.5995,
                  pointA?.lng ?? selectedLocation?.lng ?? 120.9842,
                ]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
              >
              <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {pointA && <Marker position={[pointA.lat, pointA.lng]} />}
            </MapContainer>
          </div>
        </div>
      </IonContent>

      {pointA && (
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

export default GuestLocationPicker;
