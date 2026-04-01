// src/pages/User/Home.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StallCard from '../../components/Stall/StallCard';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import { Stall } from '../../types';
import '../../styles/mobile-first-responsive.css';

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
  const [stalls] = useState<Stall[]>(MOCK_STALLS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      <IonContent className="guest-home-content ion-page-with-bottom-nav">
        {/* Logo Header */}
        <LogoHeader />

        {/* Search Bar */}
        <div className="guest-search-container">
          <IonSearchbar
            value={searchQuery}
            onIonChange={e => setSearchQuery(e.detail.value || '')}
            placeholder="Search food, stalls..."
            className="guest-searchbar"
          />
        </div>

        {/* Categories */}
        <div className="guest-categories">
          <IonSegment
            value={selectedCategory}
            onIonChange={e => setSelectedCategory(e.detail.value as string)}
            scrollable
            className="guest-category-segment"
          >
            {categories.map(cat => (
              <IonSegmentButton 
                key={cat} 
                value={cat.toLowerCase()}
                className="guest-category-btn"
              >
                <IonLabel>{cat}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>

        {/* Content */}
        <div className="guest-content">
          <h2 className="guest-section-title">Popular Near You</h2>
          
          <div className="guest-stalls-grid">
            {filteredStalls.length > 0 ? (
              filteredStalls.map(stall => (
                <StallCard 
                  key={stall.id} 
                  stall={stall}
                  onClick={() => history.push(`/stall/${stall.id}`)}
                />
              ))
            ) : (
              <div className="guest-no-results">
                <p>No stalls found. Try a different search or category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav type="user" activeTab="home" />
      </IonContent>
    </IonPage>
  );
};

export default UserHome;
