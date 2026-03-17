// src/pages/Guest/StallDetail.tsx
import React, { useState, useMemo } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { arrowBack, cartOutline, add, star, timeOutline, bicycle, checkmarkCircle, flame, locationOutline } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';
import MenuItem from '../../components/Stall/MenuItem';
import PageHeader from '../../components/PageHeader';
import GuestPromptModal from '../../components/Auth/GuestPromptModal';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { MenuItem as MenuItemType } from '../../types';
import './StallDetail.css';

// Mock inventory data for checking stock status
const MOCK_INVENTORY = [
  { id: '1', name: 'Margherita Pizza', currentStock: 5, minStock: 10, maxStock: 50 },
  { id: '2', name: 'Pepperoni Pizza', currentStock: 8, minStock: 10, maxStock: 50 },
  { id: '3', name: 'Caesar Salad', currentStock: 0, minStock: 15, maxStock: 40 },
  { id: '4', name: 'Coca Cola', currentStock: 50, minStock: 30, maxStock: 100 },
  { id: '5', name: 'Grilled Chicken Sandwich', currentStock: 2, minStock: 10, maxStock: 30 },
  { id: '6', name: 'Vegetable Tempura Roll', currentStock: 0, minStock: 20, maxStock: 40 },
  { id: '7', name: 'Cheese Fries', currentStock: 15, minStock: 10, maxStock: 30 },
  { id: '8', name: 'Sweet Potato Fries', currentStock: 12, minStock: 8, maxStock: 20 },
];

// Mock stall info data
const STALL_INFO: Record<string, any> = {
  '1': {
    name: 'Burger King',
    rating: 4.5,
    reviews: 200,
    deliveryTime: '25-35',
    deliveryFee: 2.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    status: 'Open',
    location: '123 Main St, Downtown',
  },
  '2': {
    name: 'Sushi Master',
    rating: 4.8,
    reviews: 350,
    deliveryTime: '40-50',
    deliveryFee: 3.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
    status: 'Open',
    location: '456 Oak Ave, Midtown',
  },
  '3': {
    name: 'Pizza Palace',
    rating: 4.3,
    reviews: 280,
    deliveryTime: '30-45',
    deliveryFee: 2.49,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600',
    status: 'Open',
    location: '789 Pine Rd, Uptown',
  }
};

// Mock menu data - Different items for each stall
const MOCK_MENU: MenuItemType[] = [
  // Burger King Menu (stallId: 1)
  {
    id: 'm1',
    stallId: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'Burgers',
    popular: true
  },
  {
    id: 'm2',
    stallId: '1',
    name: 'Cheese Fries',
    description: 'Crispy fries topped with melted cheddar cheese',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400',
    category: 'Sides'
  },
  {
    id: 'm3',
    stallId: '1',
    name: 'Chicken Nuggets',
    description: '10 pieces of golden crispy chicken nuggets',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400',
    category: 'Sides',
    popular: true
  },
  {
    id: 'm4',
    stallId: '1',
    name: 'Grilled Chicken Sandwich',
    description: 'Tender grilled chicken with avocado and sriracha mayo',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1562547256-c5e2b3e3e5c0?w=400',
    category: 'Burgers'
  },
  {
    id: 'm5',
    stallId: '1',
    name: 'Sweet Potato Fries',
    description: 'Golden sweet potato fries with spicy mayo',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1585238341710-4912f4e1c992?w=400',
    category: 'Sides',
    popular: true
  },
  
  // Sushi Master Menu (stallId: 2)
  {
    id: 's1',
    stallId: '2',
    name: 'California Roll',
    description: 'Fresh crab, avocado, and cucumber with rice and nori',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    category: 'Rolls',
    popular: true
  },
  {
    id: 's2',
    stallId: '2',
    name: 'Spicy Tuna Roll',
    description: 'Spicy tuna with jalapeño and sriracha mayo',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245ba1?w=400',
    category: 'Rolls',
    popular: true
  },
  {
    id: 's3',
    stallId: '2',
    name: 'Salmon Nigiri',
    description: '6 pieces of fresh salmon nigiri sushi',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    category: 'Nigiri'
  },
  {
    id: 's4',
    stallId: '2',
    name: 'Vegetable Tempura Roll',
    description: 'Crispy tempura vegetables with tempura sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1564489551917-e89b3b3d5c2f?w=400',
    category: 'Rolls'
  },
  {
    id: 's5',
    stallId: '2',
    name: 'Miso Soup',
    description: 'Traditional miso soup with tofu and seaweed',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    category: 'Sides'
  },

  // Pizza Palace Menu (stallId: 3)
  {
    id: 'p1',
    stallId: '3',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil, and tomato sauce on thin crust',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
    category: 'Pizza',
    popular: true
  },
  {
    id: 'p2',
    stallId: '3',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with mozzarella cheese',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400',
    category: 'Pizza',
    popular: true
  },
  {
    id: 'p3',
    stallId: '3',
    name: 'Vegetarian Pizza',
    description: 'Bell peppers, mushrooms, onions, and olives',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1571407-4499c2d3a0fa?w=400',
    category: 'Pizza'
  },
  {
    id: 'p4',
    stallId: '3',
    name: 'Garlic Bread',
    description: 'Crispy bread with garlic butter and parmesan',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a8a5?w=400',
    category: 'Sides'
  },
  {
    id: 'p5',
    stallId: '3',
    name: 'Caesar Salad',
    description: 'Fresh romaine with parmesan and creamy Caesar dressing',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Sides'
  }
];

const StallDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { addToCart, items, itemCount, total } = useCart();
  const { isGuest } = useAuth();
  const { isDarkMode } = useTheme();
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get stall data based on ID
  const stallInfo = STALL_INFO[id || '1'] || STALL_INFO['1'];

  // Filter menu items by stall ID
  const stallMenu = useMemo(() => {
    return MOCK_MENU.filter(item => item.stallId === id);
  }, [id]);

  // Get unique categories for this stall
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(stallMenu.map(item => item.category))];
    return cats;
  }, [stallMenu]);

  // Filter menu items by category
  const filteredMenu = useMemo(() => {
    if (selectedCategory === 'all') return stallMenu;
    return stallMenu.filter(item => item.category === selectedCategory);
  }, [selectedCategory, stallMenu]);

  const handleAddToCart = (item: MenuItemType) => {
    addToCart(item);
  };

  const handleCheckout = () => {
    if (isGuest) {
      setShowGuestPrompt(true);
    } else {
      history.push('/user/cart');
    }
  };

  const getBackHref = () => {
    return isGuest ? '/guest/home' : '/user/home';
  };

  const getCartRoute = () => {
    return isGuest ? '/guest/cart' : '/user/cart';
  };

  const getProfileRoute = () => {
    return isGuest ? '/login' : '/user/profile';
  };

  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find(i => i.id === itemId);
    return cartItem?.quantity || 0;
  };

  const isItemInStock = (itemName: string): boolean => {
    const inventoryItem = MOCK_INVENTORY.find(inv => 
      inv.name.toLowerCase() === itemName.toLowerCase()
    );
    return inventoryItem ? inventoryItem.currentStock > 0 : true;
  };

  return (
    <IonPage className="stall-detail-page">
      <PageHeader 
        showBack={true}
        backHref={getBackHref()}
        customClass="stall-detail-header"
        cartCount={itemCount}
        onCartClick={() => history.push(getCartRoute())}
        onProfileClick={() => history.push(getProfileRoute())}
      />

      <IonContent className="stall-detail-content" style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Stall Image */}
        <div className="stall-header-hero">
          <img src={stallInfo.image} alt={stallInfo.name} className="stall-hero-image" />
        </div>

        {/* Stall Name and Status - Below Image */}
        <div style={{ padding: '16px', background: 'var(--ion-card-background)', borderBottom: '1px solid var(--ion-border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h1 className="stall-name" style={{ margin: '0', fontSize: '28px', fontWeight: 700, color: 'var(--ion-text-color)' }}>{stallInfo.name}</h1>
          </div>
          <IonBadge className="stall-status-badge" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '12px' }}>
            <IonIcon icon={checkmarkCircle} style={{ marginRight: '4px' }} />
            {stallInfo.status}
          </IonBadge>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ion-text-color-secondary)', fontSize: '14px', marginBottom: '16px' }}>
            <IonIcon icon={locationOutline} style={{ fontSize: '16px' }} />
            {stallInfo.location}
          </div>

          {/* Stall Stats Card - Responsive Grid */}
          <div className="stall-stats-container">
            <div className="stall-stat-card">
              <div className="stat-icon rating-icon">
                <IonIcon icon={star} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stallInfo.rating}</div>
                <div className="stat-label">{stallInfo.reviews}+ Reviews</div>
              </div>
            </div>
            
            <div className="stall-stat-card">
              <div className="stat-icon delivery-icon">
                <IonIcon icon={timeOutline} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stallInfo.deliveryTime}</div>
                <div className="stat-label">min Delivery</div>
              </div>
            </div>
            
            <div className="stall-stat-card">
              <div className="stat-icon fee-icon">
                <IonIcon icon={bicycle} />
              </div>
              <div className="stat-content">
                <div className="stat-value">₱{stallInfo.deliveryFee.toFixed(2)}</div>
                <div className="stat-label">Delivery Fee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="menu-categories-section">
          <h3 className="section-title">Menu Categories</h3>
          <IonSegment 
            value={selectedCategory} 
            onIonChange={e => setSelectedCategory(e.detail.value as string)}
            scrollable
            className="menu-segment"
          >
            {categories.map(cat => (
              <IonSegmentButton 
                key={cat} 
                value={cat}
                className="menu-segment-button"
              >
                <IonLabel>{cat.charAt(0).toUpperCase() + cat.slice(1)}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>

        {/* Menu Items Grid */}
        <div className="menu-items-section">
          <h3 className="section-title">
            {selectedCategory === 'all' ? 'All Items' : selectedCategory}
          </h3>
          <div className="menu-items-container">
            {filteredMenu.map(item => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAdd={() => handleAddToCart(item)}
                quantity={getItemQuantity(item.id)}
                inStock={isItemInStock(item.name)}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom Spacing for FAB */}
        <div style={{ height: '100px' }}></div>
      </IonContent>

      {/* Floating Cart Button - Premium Design */}
      {itemCount > 0 && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="stall-cart-fab">
          <IonFabButton 
            onClick={handleCheckout}
            className="stall-cart-fab-button"
          >
            <div className="fab-content">
              <IonIcon icon={cartOutline} className="fab-icon" />
              <span className="fab-price">${total.toFixed(2)}</span>
            </div>
            <IonBadge className="fab-badge">
              {itemCount}
            </IonBadge>
          </IonFabButton>
        </IonFab>
      )}

      {/* Footer */}
      <div style={{ background: 'var(--ion-card-background)', borderTop: '1px solid var(--ion-border-color)', padding: '20px 16px', textAlign: 'center' }}>
        <p style={{ textAlign: 'center', margin: '0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
          © 2026 Rider App. All rights reserved.
        </p>
      </div>

      {/* Guest Prompt Modal */}
      <GuestPromptModal 
        isOpen={showGuestPrompt} 
        onClose={() => setShowGuestPrompt(false)} 
      />
    </IonPage>
  );
};

export default StallDetail;