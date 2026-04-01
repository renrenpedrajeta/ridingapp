import React from 'react';
import { 
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { 
  homeOutline,
  home,
  cartOutline,
  cart,
  personOutline,
  person,
  chatbubbleOutline,
  chatbubble,
  listOutline,
  list,
  walletOutline,
  wallet,
  createOutline,
  create,
} from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './BottomNav.css';

type TabType = 'home' | 'cart' | 'account' | 'messages' | 'orders' | 'earnings' | 'profile';

interface BottomNavProps {
  type: 'guest' | 'user' | 'rider';
  activeTab?: TabType;
}

interface TabItem {
  id: TabType;
  label: string;
  iconOutline: string;
  iconFilled: string;
  path: string;
}

const GuestTabs: TabItem[] = [
  { id: 'home', label: 'Home', iconOutline: homeOutline, iconFilled: home, path: '/guest/home' },
  { id: 'cart', label: 'Cart', iconOutline: cartOutline, iconFilled: cart, path: '/guest/cart' },
  { id: 'account', label: 'Account', iconOutline: personOutline, iconFilled: person, path: '/login' },
];

const UserTabs: TabItem[] = [
  { id: 'home', label: 'Home', iconOutline: homeOutline, iconFilled: home, path: '/user/home' },
  { id: 'cart', label: 'Cart', iconOutline: cartOutline, iconFilled: cart, path: '/user/cart' },
  { id: 'messages', label: 'Messages', iconOutline: chatbubbleOutline, iconFilled: chatbubble, path: '/messages' },
  { id: 'profile', label: 'Profile', iconOutline: personOutline, iconFilled: person, path: '/user/profile' },
];

const RiderTabs: TabItem[] = [
  { id: 'home', label: 'Home', iconOutline: homeOutline, iconFilled: home, path: '/rider/home' },
  { id: 'orders', label: 'Orders', iconOutline: listOutline, iconFilled: list, path: '/rider/orders' },
  { id: 'earnings', label: 'Earnings', iconOutline: walletOutline, iconFilled: wallet, path: '/rider/earnings' },
  { id: 'profile', label: 'Profile', iconOutline: personOutline, iconFilled: person, path: '/rider/profile' },
];

const BottomNav: React.FC<BottomNavProps> = ({ type, activeTab = 'home' }) => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useAuth();

  const getTabs = (): TabItem[] => {
    if (type === 'guest') {
      return GuestTabs;
    } else if (type === 'user') {
      return UserTabs;
    } else {
      return RiderTabs;
    }
  };

  const tabs = getTabs();

  const isActive = (tab: TabItem): boolean => {
    if (tab.id === 'account') {
      return location.pathname === '/login' || location.pathname === '/register';
    }
    return location.pathname.startsWith(tab.path) || activeTab === tab.id;
  };

  const handleTabClick = (tab: TabItem) => {
    if (tab.id === 'account') {
      if (user) {
        history.push('/user/profile');
      } else {
        history.push('/login');
      }
    } else {
      history.push(tab.path);
    }
  };

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-nav-item ${isActive(tab) ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            <IonIcon 
              icon={isActive(tab) ? tab.iconFilled : tab.iconOutline} 
              className="bottom-nav-icon"
            />
            <IonLabel className="bottom-nav-label">{tab.label}</IonLabel>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
