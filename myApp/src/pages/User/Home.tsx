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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import PageHeader from '../../components/PageHeader';
import StallCard from '../../components/Stall/StallCard';
import { Stall } from '../../types';

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
    menu: []
  }
];

const UserHome: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const { itemCount } = useCart();
  const [stalls, setStalls] = useState<Stall[]>(MOCK_STALLS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Fast Food', 'Japanese', 'Italian', 'Chinese', 'Desserts'];

  const filteredStalls = stalls.filter(stall => {
    const matchesCategory = selectedCategory === 'all' || stall.cuisine.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <IonPage>
      <PageHeader 
        cartCount={itemCount}
        onCartClick={() => history.push('/user/cart')}
        showLogo={true}
        onProfileClick={() => {
          logout();
          history.push('/login');
        }}
      />

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

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Categories */}
        <div style={{ padding: '16px 0', background: 'var(--ion-card-background)', display: 'flex', justifyContent: 'center', borderBottom: '1px solid var(--ion-border-color)' }}>
          <div style={{ maxWidth: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', paddingLeft: '16px', paddingRight: '16px' }}>
            <IonSegment 
              value={selectedCategory} 
              onIonChange={e => setSelectedCategory(e.detail.value as string)}
              scrollable
              style={{ '--background': 'transparent', width: 'auto' }}
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
                  }}
                >
                  <IonLabel style={{ fontSize: '14px', fontWeight: 600 }}>{cat}</IonLabel>
                </IonSegmentButton>
              ))}
            </IonSegment>
          </div>
        </div>

        {/* Stalls Grid */}
        <div style={{ padding: '16px' }}>
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
