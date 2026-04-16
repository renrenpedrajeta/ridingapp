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
  peopleOutline,
  people,
  bicycleOutline,
  bicycle,
  gridOutline,
  grid,
  bagOutline,
  bag,
  settingsOutline,
  settings,
  logOutOutline,
  logOut,
  documentTextOutline,
  documentText,
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppNavigate } from '../context/useAppNavigate';
import { useState } from 'react';
import './BottomNav.css';
import GuestPromptModal from './Auth/GuestPromptModal';

type TabType = 'home' | 'cart' | 'account' | 'messages' | 'orders' | 'earnings' | 'profile' | 'users' | 'riders' | 'reports' | 'products' | 'settings' | 'logout';

interface BottomNavProps {
  type: 'guest' | 'user' | 'rider' | 'admin' | 'vendor';
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
  { id: 'messages', label: 'Messages', iconOutline: chatbubbleOutline, iconFilled: chatbubble, path: '/guest/messages' },
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

const AdminTabs: TabItem[] = [
  { id: 'home', label: 'Home', iconOutline: homeOutline, iconFilled: home, path: '/admin/dashboard' },
  { id: 'users', label: 'Users', iconOutline: peopleOutline, iconFilled: people, path: '/admin/users' },
  { id: 'riders', label: 'Riders', iconOutline: bicycleOutline, iconFilled: bicycle, path: '/admin/riders' },
  { id: 'orders', label: 'Orders', iconOutline: listOutline, iconFilled: list, path: '/admin/orders' },
  { id: 'reports', label: 'Reports', iconOutline: documentTextOutline, iconFilled: documentText, path: '/admin/reports' },
  { id: 'logout', label: 'Logout', iconOutline: logOutOutline, iconFilled: logOut, path: '/admin/login' },
];

const VendorTabs: TabItem[] = [
  { id: 'home', label: 'Home', iconOutline: gridOutline, iconFilled: grid, path: '/vendor/dashboard' },
  { id: 'orders', label: 'Orders', iconOutline: listOutline, iconFilled: list, path: '/vendor/orders' },
  { id: 'products', label: 'Products', iconOutline: bagOutline, iconFilled: bag, path: '/vendor/products' },
  { id: 'logout', label: 'Logout', iconOutline: logOutOutline, iconFilled: logOut, path: '/vendor/login' },
];

const BottomNav: React.FC<BottomNavProps> = ({ type, activeTab = 'home' }) => {
  const { navigate } = useAppNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  const getTabs = (): TabItem[] => {
    if (type === 'guest') {
      return GuestTabs;
    } else if (type === 'user') {
      return UserTabs;
    } else if (type === 'rider') {
      return RiderTabs;
    } else if (type === 'admin') {
      return AdminTabs;
    } else if (type === 'vendor') {
      return VendorTabs;
    }
    return UserTabs;
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
        navigate('/user/profile');
      } else {
        navigate('/login');
      }
    } else if (tab.id === 'logout') {
      if (type === 'admin') {
        logout('admin');
        navigate('/admin/login');
      } else if (type === 'vendor') {
        logout('vendor');
        navigate('/vendor/login');
      } else if (type === 'rider') {
        logout('rider');
        navigate('/rider/login');
      } else if (type === 'user') {
        logout('user');
        navigate('/login');
      }
    } else if (type === 'guest' && (tab.id === 'cart' || tab.id === 'messages')) {
      setShowGuestPrompt(true);
    } else if (tab.id === 'cart' && user) {
      navigate('/user/cart');
    } else if (tab.id === 'messages' && user) {
      navigate('/messages');
    } else if (tab.id === 'cart' || tab.id === 'messages') {
      navigate('/login');
    } else {
      navigate(tab.path);
    }
  };

  return (
    <>
      <div className="bottom-nav-container">
        <div className="bottom-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`bottom-nav-item ${isActive(tab) ? 'active' : ''} ${tab.id === 'logout' ? 'logout-item' : ''}`}
              onClick={() => handleTabClick(tab)}
              style={tab.id === 'logout' ? { color: '#EF4444' } : undefined}
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
      {type === 'guest' && (
        <GuestPromptModal isOpen={showGuestPrompt} onClose={() => setShowGuestPrompt(false)} />
      )}
    </>
  );
};

export default BottomNav;
