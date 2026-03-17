// src/pages/User/Home.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import StallCard from '../../components/Stall/StallCard';
import UserNavBar from '../../components/Navbar/UserNavBar';
import { Stall } from '../../types';
import '../../styles/mobile-first-responsive.css';

// Mock data - Same stalls as Guest
const MOCK_STALLS: Stall[] = [
  {
    id: '1',
    name: 'Burger King',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minOrder: 10,
    cuisine: 'Fast Food',
    location: '123 Main St, Downtown',
    menu: []
  },
  {
    id: '2',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    rating: 4.8,
    deliveryTime: '40-50 min',
    deliveryFee: 3.99,
    minOrder: 20,
    cuisine: 'Japanese',
    location: '456 Oak Ave, Midtown',
    menu: []
  },
  {
    id: '3',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
    rating: 4.3,
    deliveryTime: '30-45 min',
    deliveryFee: 2.49,
    minOrder: 15,
    cuisine: 'Italian',
    location: '789 Pine Rd, Uptown',
    menu: []
  }
];

const UserHome: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const { isDarkMode } = useTheme();
  const [stalls, setStalls] = useState<Stall[]>(MOCK_STALLS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Protect this page - redirect if not logged in or not a user
  if (!user || (user.role !== 'user' && user.role !== 'rider')) {
    history.replace('/login');
    return null;
  }

  const categories = ['All', 'Fast Food', 'Japanese', 'Italian', 'Chinese', 'Desserts'];

  const filteredStalls = stalls.filter(stall => {
    const matchesCategory = selectedCategory === 'all' || stall.cuisine.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <IonPage>
      <UserNavBar title="Home" showCart={true} cartCount={itemCount} />
      
      {/* Search Bar */}
      <IonToolbar style={{ '--background': 'var(--ion-background-color)', padding: '0' } as any}>
        <div style={{ padding: '4px 10px' }}>
          <IonSearchbar
            value={searchQuery}
            onIonChange={e => setSearchQuery(e.detail.value!)}
            placeholder="Search..."
            className="searchbar-mobile"
            style={{
              '--background': 'var(--ion-card-background)',
              '--border-radius': '8px',
              '--border': '1px solid var(--ion-border-color)',
              '--placeholder-color': 'var(--ion-text-color-secondary)',
              '--icon-color': 'var(--ion-color-primary)',
              '--color': 'var(--ion-text-color)',
              '--box-shadow': '0 1px 4px rgba(99, 102, 241, 0.08)',
              height: '36px'
            } as any}
          />
        </div>
      </IonToolbar>

      {/* Categories Section */}
      <div style={{ 
        padding: '4px 0', 
        background: 'var(--ion-card-background)', 
        borderBottom: '1px solid var(--ion-border-color)',
        overflow: 'hidden'
      }}>
        <div className="category-segment-mobile" style={{ padding: '4px 8px' }}>
          <IonSegment 
            value={selectedCategory} 
            onIonChange={e => setSelectedCategory(e.detail.value as string)}
            scrollable
            style={{ '--background': 'transparent' } as any}
          >
            {categories.map(cat => (
              <IonSegmentButton 
                key={cat} 
                value={cat.toLowerCase()}
                style={{ 
                  '--color': 'var(--ion-text-color-secondary)',
                  '--color-checked': '#FFFFFF',
                  '--border-radius': '6px',
                  '--indicator-color': 'transparent',
                  fontSize: '12px',
                  fontWeight: 600
                } as any}
              >
                <IonLabel>{cat}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>
      </div>

      <IonContent style={{ '--background': 'var(--ion-background-color)', overflow: 'auto' } as any}>
        {/* Quick Access Menu - Responsive Grid */}
        <div style={{ padding: '10px 8px' }}>
          <div className="quick-access-mobile" style={{ marginBottom: '8px' }}>
            <div 
              onClick={() => history.push('/activities')}
              style={{
                padding: '8px 6px',
                background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '65px'
              }}
            >
              <div style={{ fontSize: '18px', marginBottom: '2px' }}>📋</div>
              <p style={{ margin: 0, fontSize: '9px', fontWeight: 600 }}>Activities</p>
            </div>
            <div 
              onClick={() => history.push('/messages')}
              style={{
                padding: '8px 6px',
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '65px'
              }}
            >
              <div style={{ fontSize: '18px', marginBottom: '2px' }}>💬</div>
              <p style={{ margin: 0, fontSize: '9px', fontWeight: 600 }}>Messages</p>
            </div>
            <div 
              onClick={() => history.push('/report')}
              style={{
                padding: '8px 6px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '65px'
              }}
            >
              <div style={{ fontSize: '18px', marginBottom: '2px' }}>⚠️</div>
              <p style={{ margin: 0, fontSize: '9px', fontWeight: 600 }}>Report</p>
            </div>
          </div>

          {/* Popular Near You Section */}
          <h2 className="mobile-h2" style={{ 
            color: 'var(--ion-text-color)',
            margin: '8px 0 8px 0',
            fontWeight: 700,
            fontSize: '16px'
          }}>
            Popular Near You
          </h2>
          
          {/* Stalls Grid - Responsive */}
          <div className="stalls-grid-mobile">
            {filteredStalls.length > 0 ? (
              filteredStalls.map(stall => (
                <StallCard 
                  key={stall.id} 
                  stall={stall}
                  onClick={() => history.push(`/stall/${stall.id}`)}
                />
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1',
                textAlign: 'center', 
                padding: '32px 16px',
                color: 'var(--ion-text-color-secondary)'
              }}>
                <p style={{ fontSize: '14px' }}>No stalls found. Try a different search or category.</p>
              </div>
            )}
          </div>
        </div>
      </IonContent>

      {/* Footer */}
      <div style={{ 
        background: 'var(--ion-card-background)', 
        borderTop: '1px solid var(--ion-border-color)', 
        padding: '8px 12px',
        textAlign: 'center' 
      }}>
        <p style={{ textAlign: 'center', margin: '0', fontSize: '10px', color: 'var(--ion-text-color-secondary)' }}>
          © 2026 Rider App
        </p>
      </div>
    </IonPage>
  );
};

export default UserHome;
