import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonIcon,
  IonFooter,
  IonButton,
  IonAlert,
  IonButtons
} from "@ionic/react";

import { locationOutline, closeOutline } from "ionicons/icons";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
// import GuestLocationPicker from "./LocationPickerBkup";

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

// function ChangeMapView({ center }: any) {
//   const map = useMap();
//   map.setView(center, 16);
//   return null;
// }

function ChangeMapView({ center }: any) {
  const map = useMap();

  map.setView(center, 16);

  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  return null;
}

const GuestLocationPicker: React.FC = () => {

  const history = useHistory();
  const { isDarkMode } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [center, setCenter] = useState<[number, number]>([14.5995,120.9842]);
  const [showAlert, setShowAlert] = useState(false);


  const handleConfirmLocation = () => {
    if (!marker || !query) {
      setShowAlert(true);
      return;
    }

    // Save location to sessionStorage
    sessionStorage.setItem('selectedLocation', JSON.stringify({
      lat: marker[0],
      lng: marker[1]
    }));
    sessionStorage.setItem('locationName', query);

    // Navigate back to where they came from
    history.goBack();
  };

  
  // const searchLocation = async (text: string) => {

  //   setQuery(text);

  //   if(text.length < 3){
  //     setResults([]);
  //     return;
  //   }

  //   const res = await fetch(
  //     `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
  //   );

  //   const data = await res.json();
  //   setResults(data);
  // };

  const debounceRef = useRef<any>(null);

  const searchLocation = (text: string) => {
    setQuery(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {

      if (text.length < 3) {
        setResults([]);
        return;
      }

      // const res = await fetch(
      //   `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
      // );

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
      {
        headers: {
          "User-Agent": "my-ionic-leaflet-app"
        }
      }
    );

      const data = await res.json();
      setResults(data);

    }, 600);
  };
  const chooseLocation = (loc: LocationResult) => {

    const lat = parseFloat(loc.lat);
    const lon = parseFloat(loc.lon);

    setCenter([lat,lon]);
    setMarker([lat,lon]);
    setResults([]);
    setQuery(loc.display_name);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Plan Your Route</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--ion-background-color)' } as any}>

        {/* INPUT */}
        <div style={{marginBottom:"15px", position: "relative"}}>
          <label style={{fontSize:"12px",color:"var(--ion-text-color-secondary)"}}>FROM</label>

          <div style={{
            display:"flex",
            alignItems:"center",
            border:"1px solid var(--ion-border-color)",
            borderRadius:"8px",
            padding:"8px",
            background:"var(--ion-card-background)",
            color:"var(--ion-text-color)"
          }}>
            <IonIcon icon={locationOutline} style={{marginRight:"8px", color:"var(--ion-text-color)"}}/>

            <IonInput
              value={query}
              placeholder="Enter starting location"
              onIonInput={(e:any)=>searchLocation(e.target.value)}
              style={{ '--color': 'var(--ion-text-color)', '--placeholder-color': 'var(--ion-text-color-secondary)' } as any}
            />
          </div>

          {/* AUTOCOMPLETE */}
          {results.length > 0 && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background:"var(--ion-card-background)",
              border:"1px solid var(--ion-border-color)",
              borderRadius:"8px",
              marginTop:"4px",
              maxHeight:"200px",
              overflow:"auto",
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 1000
            }}>
              {results.map((r,index)=>(
                <div
                  key={index}
                  style={{
                    padding:"10px",
                    borderBottom:"1px solid var(--ion-border-color)",
                    cursor:"pointer",
                    color:"var(--ion-text-color)"
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                  onClick={()=>chooseLocation(r)}
                >
                  {r.display_name}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* MAP */}
        <div style={{
          height:"45vh",
          borderRadius:"14px",
          overflow:"hidden"
        }}>
          <MapContainer
            center={center}
            zoom={13}
            style={{height:"100%",width:"100%"}}
          >

            <TileLayer
              attribution='© OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeMapView center={center}/>

            {marker && <Marker position={marker}/>}

          </MapContainer>

        </div>

      </IonContent>
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

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Select Location"
          message="Please search and select a location before confirming your route."
          buttons={['OK']}
        />

    </IonPage>
  );
};

export default GuestLocationPicker;