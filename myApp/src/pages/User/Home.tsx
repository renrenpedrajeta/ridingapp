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
  IonHeader,
  IonButtons,
  IonIcon,
  IonBadge,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import StallCard from '../../components/Stall/StallCard';
import { Stall } from '../../types';
import { cartOutline, personCircleOutline, settingsOutline, logOutOutline, moonOutline, sunnyOutline } from 'ionicons/icons';

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
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    history.push('/guest/home');
  };

  return (
    <IonPage>
      {/* Custom Header with Profile Dropdown */}
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            <IonButton onClick={toggleTheme} fill="clear">
              <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} color="primary" />
            </IonButton>
          </IonButtons>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ion-text-color)', margin: 0 }}>
              <span style={{ color: '#6366F1' }}>Rider</span> App
            </h1>
          </div>

          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/user/cart')} fill="clear">
              <div style={{ position: 'relative' }}>
                <IonIcon icon={cartOutline} color="primary" />
                {itemCount > 0 && (
                  <IonBadge style={{ 
                    position: 'absolute', 
                    top: '-5px', 
                    right: '-5px', 
                    background: '#EF4444',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    {itemCount}
                  </IonBadge>
                )}
              </div>
            </IonButton>
            <IonButton onClick={() => setProfileMenuOpen(!profileMenuOpen)} fill="clear">
              <IonIcon icon={personCircleOutline} color="primary" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Profile Dropdown Menu */}
      {profileMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
          position: 'absolute',
          top: '60px',
          right: '16px',
          background: 'var(--ion-card-background)',
          border: '1px solid var(--ion-border-color)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          zIndex: 1000,
          minWidth: '240px',
          maxWidth: '280px'
        }}>
          {/* Profile Info */}
          <div style={{
            padding: '16px',
            cursor: 'pointer',
            borderBottom: '1px solid var(--ion-border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
          onClick={() => history.push('/user/profile')}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              👤
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--ion-text-color)' }}>{user?.name}</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>{user?.email}</p>
            </div>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => {
              history.push('/user/settings');
              setProfileMenuOpen(false);
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: 'none',
              background: 'transparent',
              color: 'var(--ion-text-color)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              borderBottom: '1px solid var(--ion-border-color)'
            }}
          >
            <IonIcon icon={settingsOutline} style={{ color: '#6366F1', fontSize: '18px' }} />
            <span>Settings</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              setProfileMenuOpen(false);
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: 'none',
              background: 'transparent',
              color: '#EF4444',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <IonIcon icon={logOutOutline} style={{ color: '#EF4444', fontSize: '18px' }} />
            <span>Logout</span>
          </button>
        </div>
      )}

      <IonToolbar style={{ '--background': 'var(--ion-background-color)', padding: '16px 0 0 0' } as any}>
        <div style={{ padding: '12px 16px 16px 16px' }}>
          <IonSearchbar
            value={searchQuery}
            onIonChange={e => setSearchQuery(e.detail.value!)}
            placeholder="Search food, stalls..."
            style={{
              '--background': 'var(--ion-card-background)',
              '--border-radius': '12px',
              '--border': '1px solid var(--ion-border-color)',
              '--placeholder-color': 'var(--ion-text-color-secondary)',
              '--icon-color': 'var(--ion-color-primary)',
              '--color': 'var(--ion-text-color)',
              padding: '0',
              height: '48px',
              '--box-shadow': '0 2px 12px rgba(99, 102, 241, 0.12)'
            } as any}
          />
        </div>
      </IonToolbar>

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any} onClick={() => setProfileMenuOpen(false)}>
        {/* Categories */}
        <div style={{ padding: '16px 0', background: 'var(--ion-card-background)', display: 'flex', justifyContent: 'center', borderBottom: '1px solid var(--ion-border-color)' }}>
          <div style={{ maxWidth: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', paddingLeft: '16px', paddingRight: '16px' }}>
            <IonSegment 
              value={selectedCategory} 
              onIonChange={e => setSelectedCategory(e.detail.value as string)}
              scrollable
              style={{ '--background': 'transparent', width: 'auto' } as any}
            >
              {categories.map(cat => (
                <IonSegmentButton 
                  key={cat} 
                  value={cat.toLowerCase()}
                  className="category-segment-btn"
                  style={{ 
                    '--color': 'var(--ion-text-color-secondary)',
                    '--color-checked': '#FFFFFF',
                    '--border-radius': '8px',
                    '--indicator-color': 'transparent'
                  } as any}
                >
                  <IonLabel style={{ fontSize: '14px', fontWeight: 600 }}>{cat}</IonLabel>
                </IonSegmentButton>
              ))}
            </IonSegment>
          </div>
        </div>

        {/* Role Navigation */}
        <div style={{ 
          padding: '16px', 
          display: 'flex', 
          gap: '12px',
          background: 'var(--ion-background-color)',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px'
        }}>
          <IonButton
            expand="block"
            style={{
              '--background': '#6366F1',
              '--color': '#FFFFFF',
              height: '44px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'none'
            }}
            onClick={() => history.push('/user/home')}
          >
            🛒 Order Food
          </IonButton>
        </div>

        {/* Stalls Grid */}
        <div style={{ padding: '16px' }}>
          {/* Quick Access Menu */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <div 
              onClick={() => history.push('/activities')}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>📋</div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 600 }}>Activities</p>
            </div>
            <div 
              onClick={() => history.push('/messages')}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>💬</div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 600 }}>Messages</p>
            </div>
            <div 
              onClick={() => history.push('/report')}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>⚠️</div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 600 }}>Report</p>
            </div>
          </div>

          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 700, 
            color: 'var(--ion-text-color)',
            margin: '16px 0 16px 0'
          }}>
            Popular Near You
          </h2>
          
          <div className="stalls-grid">
            {filteredStalls.map(stall => (
              <StallCard 
                key={stall.id} 
                stall={stall}
                onClick={() => history.push(`/stall/${stall.id}`)}
              />
            ))}
          </div>
        </div>
      </IonContent>

      {/* Footer */}
      <div style={{ background: 'var(--ion-card-background)', borderTop: '1px solid var(--ion-border-color)', padding: '20px 16px', textAlign: 'center' }}>
        <p style={{ textAlign: 'center', margin: '0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
          © 2026 Rider App. All rights reserved.
        </p>
      </div>
    </IonPage>
  );
};

export default UserHome;
