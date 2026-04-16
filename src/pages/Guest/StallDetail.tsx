// src/pages/Guest/StallDetail.tsx
import React, { useState, useMemo } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
} from '@ionic/react';
import { add, remove, star, timeOutline, locationOutline, checkmarkCircle } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useAppNavigate } from '../../context/useAppNavigate';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import GuestPromptModal from '../../components/Auth/GuestPromptModal';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MenuItem as MenuItemType } from '../../types';
import './StallDetail.css';

const STALL_INFO: Record<string, any> = {
  '1': {
    name: 'Burger King',
    rating: 4.5,
    reviews: 200,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    status: 'Open',
    location: '123 Main St, Downtown',
  },
  '2': {
    name: 'Sushi Master',
    rating: 4.8,
    reviews: 350,
    deliveryTime: '40-50 min',
    deliveryFee: 3.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
    status: 'Open',
    location: '456 Oak Ave, Midtown',
  },
  '3': {
    name: 'Pizza Palace',
    rating: 4.3,
    reviews: 280,
    deliveryTime: '30-45 min',
    deliveryFee: 2.49,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600',
    status: 'Open',
    location: '789 Pine Rd, Uptown',
  }
};

const MOCK_MENU: MenuItemType[] = [
  { id: 'm1', stallId: '1', name: 'Classic Burger', description: 'Juicy beef patty with fresh lettuce and special sauce', price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'Burgers', popular: true },
  { id: 'm2', stallId: '1', name: 'Cheese Fries', description: 'Crispy fries with melted cheddar cheese', price: 4.99, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400', category: 'Sides' },
  { id: 'm3', stallId: '1', name: 'Chicken Nuggets', description: '10 pieces of golden crispy chicken nuggets', price: 6.99, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400', category: 'Sides', popular: true },
  { id: 'm4', stallId: '1', name: 'Chicken Sandwich', description: 'Tender grilled chicken with avocado', price: 9.99, image: 'https://images.unsplash.com/photo-1562547256-c5e2b3e3e5c0?w=400', category: 'Burgers' },
  { id: 'm5', stallId: '1', name: 'Sweet Potato Fries', description: 'Golden sweet potato fries', price: 5.99, image: 'https://images.unsplash.com/photo-1585238341710-4912f4e1c992?w=400', category: 'Sides', popular: true },
  { id: 's1', stallId: '2', name: 'California Roll', description: 'Fresh crab, avocado, and cucumber', price: 9.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', category: 'Rolls', popular: true },
  { id: 's2', stallId: '2', name: 'Spicy Tuna Roll', description: 'Spicy tuna with jalapeño', price: 11.99, image: 'https://images.unsplash.com/photo-1579584425555-c3a5142c3055?w=400', category: 'Rolls', popular: true },
  { id: 's3', stallId: '2', name: 'Salmon Nigiri', description: '6 pieces of fresh salmon sushi', price: 12.99, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', category: 'Nigiri' },
  { id: 's4', stallId: '2', name: 'Veggie Roll', description: 'Crispy tempura vegetables', price: 8.99, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400', category: 'Rolls' },
  { id: 's5', stallId: '2', name: 'Miso Soup', description: 'Traditional miso with tofu', price: 3.99, image: 'https://images.unsplash.com/photo-1612757869908-a4a5cb1146a0?w=400', category: 'Sides' },
  { id: 'p1', stallId: '3', name: 'Margherita Pizza', description: 'Fresh mozzarella and basil', price: 12.99, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400', category: 'Pizza', popular: true },
  { id: 'p2', stallId: '3', name: 'Pepperoni Pizza', description: 'Classic pepperoni with mozzarella', price: 13.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400', category: 'Pizza', popular: true },
  { id: 'p3', stallId: '3', name: 'Veggie Pizza', description: 'Bell peppers, mushrooms, olives', price: 12.99, image: 'https://images.unsplash.com/photo-1571407974678-8f7f68163b92?w=400', category: 'Pizza' },
  { id: 'p4', stallId: '3', name: 'Garlic Bread', description: 'Crispy bread with garlic butter', price: 4.99, image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a8a5?w=400', category: 'Sides' },
  { id: 'p5', stallId: '3', name: 'Caesar Salad', description: 'Fresh romaine with parmesan', price: 7.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', category: 'Sides' }
];

const StallDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { navigate } = useAppNavigate();
  const { addToCart, removeFromCart, items } = useCart();
  const { isGuest } = useAuth();
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const stallInfo = STALL_INFO[id || '1'] || STALL_INFO['1'];

  const stallMenu = useMemo(() => MOCK_MENU.filter(item => item.stallId === id), [id]);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(stallMenu.map(item => item.category))];
    return cats;
  }, [stallMenu]);

  const filteredMenu = useMemo(() => {
    if (selectedCategory === 'all') return stallMenu;
    return stallMenu.filter(item => item.category === selectedCategory);
  }, [selectedCategory, stallMenu]);

  const handleAdd = (item: MenuItemType) => addToCart(item);
  const handleRemove = (itemId: string) => removeFromCart(itemId);

  const handleCheckout = () => {
    if (isGuest) {
      setShowGuestPrompt(true);
    } else {
      navigate('/user/cart');
    }
  };

  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find(i => i.id === itemId);
    return cartItem?.quantity || 0;
  };

  const cartTotal = items.filter(i => stallMenu.some(m => m.id === i.id)).reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = items.filter(i => stallMenu.some(m => m.id === i.id)).reduce((sum, i) => sum + i.quantity, 0);

  return (
    <IonPage className="stall-detail-page">
      <IonContent className="stall-detail-content ion-page-with-bottom-nav">
        <LogoHeader />

        {/* Hero Image */}
        <div className="stall-hero">
          <img src={stallInfo.image} alt={stallInfo.name} className="stall-hero-img" crossOrigin="anonymous" />
          <div className="stall-hero-overlay">
            <IonBadge className="open-badge">
              <IonIcon icon={checkmarkCircle} />
              Open
            </IonBadge>
          </div>
        </div>

        {/* Store Info */}
        <div className="stall-info-section">
          <h1 className="stall-title">{stallInfo.name}</h1>
          
          <div className="stall-meta">
            <span className="meta-item">
              <IonIcon icon={star} className="meta-icon rating" />
              {stallInfo.rating} ({stallInfo.reviews}+)
            </span>
            <span className="meta-item">
              <IonIcon icon={timeOutline} className="meta-icon" />
              {stallInfo.deliveryTime} min
            </span>
            <span className="meta-item">
              <IonIcon icon={locationOutline} className="meta-icon" />
              {stallInfo.location.split(',')[0]}
            </span>
          </div>

          {/* Delivery Info Bar */}
          <div className="delivery-info-bar">
            <div className="delivery-info-item">
              <span className="delivery-label">Delivery Fee</span>
              <span className="delivery-value">₱{stallInfo.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="delivery-divider"></div>
            <div className="delivery-info-item">
              <span className="delivery-label">Est. Time</span>
              <span className="delivery-value">{stallInfo.deliveryTime} min</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-section">
          <IonSegment value={selectedCategory} onIonChange={e => setSelectedCategory(e.detail.value as string)} scrollable className="category-segment">
            {categories.map(cat => (
              <IonSegmentButton key={cat} value={cat} className="category-btn">
                <IonLabel>{cat === 'all' ? '🍽️ All' : cat}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>

        {/* Menu Grid - Simple Card Layout */}
        <div className="menu-section">
          <div className="menu-grid">
            {filteredMenu.map(item => {
              const qty = getItemQuantity(item.id);
              return (
                <div key={item.id} className={`menu-card ${item.popular ? 'popular' : ''}`}>
                  <div className="menu-card-image">
                    <img src={item.image} alt={item.name} crossOrigin="anonymous" />
                    {item.popular && <span className="popular-tag">🔥 Popular</span>}
                  </div>
                  <div className="menu-card-body">
                    <h3 className="menu-card-name">{item.name}</h3>
                    <p className="menu-card-desc">{item.description}</p>
                    <div className="menu-card-footer">
                      <span className="menu-card-price">₱{item.price.toFixed(2)}</span>
                      {qty > 0 ? (
                        <div className="quantity-controls">
                          <button className="qty-btn minus" onClick={() => handleRemove(item.id)}>
                            <IonIcon icon={remove} />
                          </button>
                          <span className="qty-count">{qty}</span>
                          <button className="qty-btn plus" onClick={() => handleAdd(item)}>
                            <IonIcon icon={add} />
                          </button>
                        </div>
                      ) : (
                        <button className="add-btn" onClick={() => handleAdd(item)}>
                          <IonIcon icon={add} />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <BottomNav type="guest" activeTab="home" />
      </IonContent>

      {/* Cart Floating Button */}
      {cartCount > 0 && (
        <div className="cart-float-btn" onClick={handleCheckout}>
          <div className="cart-float-content">
            <span className="cart-float-count">{cartCount} items</span>
            <span className="cart-float-price">View Cart • ₱{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      <GuestPromptModal isOpen={showGuestPrompt} onClose={() => setShowGuestPrompt(false)} />
    </IonPage>
  );
};

export default StallDetail;
