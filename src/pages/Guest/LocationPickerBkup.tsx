// src/pages/Guest/LocationPicker.tsx
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from 'react-leaflet';
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


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
  IonSpinner,
} from '@ionic/react';
import { locationOutline, arrowBack, search } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const MapClickHandler = ({ setPointA, setPointB, pointA }: any) => {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      if (!pointA) {
        setPointA(e.latlng);
      } else {
        setPointB(e.latlng);
      }
    }
  });
  return null;
};

// Geocoding service using Nominatim
const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }
  return null;
};

// Routing service using OSRM
const getRoute = async (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): Promise<{ coordinates: [number, number][]; distance: number; duration: number } | null> => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`
    );
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coordinates = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
      return {
        coordinates,
        distance: route.distance / 1000, // Convert to km
        duration: route.duration / 60, // Convert to minutes
      };
    }
  } catch (error) {
    console.error('Routing error:', error);
  }
  return null;
};

const GuestLocationPicker: React.FC = () => {
  // inside your component
  var staticAddress = "Calaba, San Isidro, Nueva Ecija, Central Luzon, 3108, Philippines";
  const [pointA, setPointA] = useState<{ lat: number; lng: number } | null>(null);
  const [pointB, setPointB] = useState<{ lat: number; lng: number } | null>(null);
  const history = useHistory();
  const [addressFrom, setAddressFrom] = useState('');
  const [addressTo, setAddressTo] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchingFrom, setSearchingFrom] = useState(false);
  const [searchingTo, setSearchingTo] = useState(false);
  const [routeData, setRouteData] = useState<{ coordinates: [number, number][]; distance: number; duration: number } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState({ from: false, to: false });
  const [suggestions, setSuggestions] = useState<any>({ from: [], to: [] });
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Get user's current location
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

  // Fetch route when both points are set
  useEffect(() => {
    const fetchRoute = async () => {
      if (pointA && pointB) {
        const route = await getRoute(pointA, pointB);
        setRouteData(route);
      }
    };
    fetchRoute();
  }, [pointA, pointB]);

  // Auto-complete search for "from" location
  const handleSearchFrom = async (value: string) => {
    setAddressFrom(value);
    if (value.length > 2) {
      setSearchingFrom(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5`
        );
        const data = await response.json();
        setSuggestions((prev: any) => ({ ...prev, from: data }));
        setShowSuggestions((prev) => ({ ...prev, from: true }));
      } catch (error) {
        console.error('Search error:', error);
      }
      setSearchingFrom(false);
    }
  };

  // Auto-complete search for "to" location
  const handleSearchTo = async (value: string) => {
    setAddressTo(value);
    if (value.length > 2) {
      setSearchingTo(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5`
        );
        const data = await response.json();
        setSuggestions((prev: any) => ({ ...prev, to: data }));
        setShowSuggestions((prev) => ({ ...prev, to: true }));
      } catch (error) {
        console.error('Search error:', error);
      }
      setSearchingTo(false);
    }
  };

  // Select suggestion for "from" location
  const selectSuggestionFrom = (suggestion: any) => {
    const coords = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) };
    setPointA(coords);
    setAddressFrom(suggestion.display_name);
    setShowSuggestions((prev) => ({ ...prev, from: false }));
  };

  // Select suggestion for "to" location
  const selectSuggestionTo = (suggestion: any) => {
    const coords = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) };
    setPointB(coords);
    setAddressTo(suggestion.display_name);
    setShowSuggestions((prev) => ({ ...prev, to: false }));
  };

  const handleConfirmLocation = () => {
    if (pointA && pointB) {
      sessionStorage.setItem('pointA', JSON.stringify(pointA));
      sessionStorage.setItem('pointB', JSON.stringify(pointB));
      sessionStorage.setItem('addressFrom', addressFrom);
      sessionStorage.setItem('addressTo', addressTo);
      if (routeData) {
        sessionStorage.setItem('routeData', JSON.stringify(routeData));
      }
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
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
              From
            </label>
            <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={locationOutline} slot="start" color="primary" />
              <IonInput
                placeholder="Enter starting location"
                value={addressFrom}
                onIonChange={(e: any) => handleSearchFrom(e.detail.value!)}
                onIonFocus={() => addressFrom.length > 2 && setShowSuggestions((prev) => ({ ...prev, from: true }))}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
              {searchingFrom && <IonSpinner slot="end" name="dots" />}
            </IonItem>
            
            {/* From Suggestions */}
            {showSuggestions.from && suggestions.from.length > 0 && (
              <div style={{
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
              }}>
                {suggestions.from.map((suggestion: any, idx: number) => (
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

          {/* Search To */}
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>
              To
            </label>
            <IonItem style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={locationOutline} slot="start" color="primary" />
              <IonInput
                placeholder="Enter destination"
                value={addressTo}
                onIonChange={(e: any) => handleSearchTo(e.detail.value!)}
                onIonFocus={() => addressTo.length > 2 && setShowSuggestions((prev) => ({ ...prev, to: true }))}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
              {searchingTo && <IonSpinner slot="end" name="dots" />}
            </IonItem>

            {/* To Suggestions */}
            {showSuggestions.to && suggestions.to.length > 0 && (
              <div style={{
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
              }}>
                {suggestions.to.map((suggestion: any, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => selectSuggestionTo(suggestion)}
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
              center={[14.5995, 120.9842]} // Manila default
              zoom={13}
              style={{ width: '100%', height: '100%' }}
              ref={mapRef as any}
            >
              <TileLayer
                attribution='© OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {pointA && <Marker position={[pointA.lat, pointA.lng]} />}
              {pointB && <Marker position={[pointB.lat, pointB.lng]} />}
              
              {/* Display Route */}
              {routeData && routeData.coordinates.length > 0 && (
                <Polyline
                  positions={routeData.coordinates}
                  color="#6366F1"
                  weight={5}
                  opacity={0.8}
                />
              )}
            </MapContainer>
          </div>

          {/* Route Summary */}
          {routeData && (
            <div
              style={{
                background: 'var(--ion-card-background)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--ion-border-color)',
                marginBottom: '24px',
              }}
            >
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: 'var(--ion-text-color)' }}>
                Trip Summary
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Distance</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 700, color: '#6366F1' }}>
                    {routeData.distance.toFixed(1)} km
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Duration</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 700, color: '#6366F1' }}>
                    {Math.round(routeData.duration)} min
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>ETA</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 700, color: '#6366F1' }}>
                    {new Date(Date.now() + routeData.duration * 60000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>

      {/* Footer */}
      {pointA && pointB && (
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
            Confirm Route
          </IonButton>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default GuestLocationPicker;
