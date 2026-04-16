import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import {
  home,
  cartOutline,
  personOutline,
  logOutOutline,
  settingsOutline,
  sunnyOutline,
  moonOutline,
  listOutline,
  chatbubbleOutline,
  timeOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { useCart } from '../../context/CartContext';
import { useAppNavigate } from '../../context/useAppNavigate';
import '../Navbar.css';

interface UserNavBarProps {
  title?: string;
  showCart?: boolean;
  cartCount?: number;
}

const UserNavBar: React.FC<UserNavBarProps> = ({
  showCart = true,
}) => {
  const { navigate } = useAppNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();
  const { itemCount } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const navigateTo = (path: string) => {
    setShowUserMenu(false);
    navigate(path);
  };

  return (
    <IonHeader className="navbar-header">
      <IonToolbar className="navbar-toolbar">
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <button 
            className="navbar-logo-btn"
            onClick={() => navigate('/user/home')}
          >
            <span className="navbar-logo">
              <span className="logo-primary">Rider</span>
              <span className="logo-secondary">App</span>
            </span>
          </button>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <button 
            className="navbar-icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} />
          </button>

          {/* Messages */}
          <button 
            className="navbar-icon-btn"
            onClick={() => navigate('/messages')}
            aria-label="Messages"
          >
            <IonIcon icon={chatbubbleOutline} />
            {unreadCount > 0 && (
              <span className="navbar-cart-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
            )}
          </button>

          {/* Cart Button */}
          {showCart && (
            <button 
              className="navbar-icon-btn"
              onClick={() => navigate('/user/cart')}
              aria-label="Shopping cart"
            >
              <IonIcon icon={cartOutline} />
              {itemCount > 0 && (
                <span className="navbar-cart-badge">{itemCount > 9 ? '9+' : itemCount}</span>
              )}
            </button>
          )}

          {/* User Menu Button */}
          <button 
            className="navbar-icon-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
          >
            <IonIcon icon={personOutline} />
          </button>
        </div>
      </IonToolbar>

      {/* User Dropdown Menu */}
      {showUserMenu && (
        <>
          <div 
            className="navbar-menu-overlay"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="navbar-user-menu">
            <div className="navbar-user-header">
              <div className="navbar-user-avatar">
                <IonIcon icon={personCircleOutline} />
              </div>
              <div className="navbar-user-info">
                <p className="navbar-user-name">{user?.name || 'User'}</p>
                <p className="navbar-user-email">{user?.email || ''}</p>
              </div>
            </div>

            <div className="navbar-menu-items">
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/user/home')}
              >
                <IonIcon icon={home} />
                <span className="navbar-menu-item-text">Home</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/user/cart')}
              >
                <IonIcon icon={cartOutline} />
                <span className="navbar-menu-item-text">Cart</span>
                {itemCount > 0 && <span className="menu-badge">{itemCount}</span>}
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/messages')}
              >
                <IonIcon icon={chatbubbleOutline} />
                <span className="navbar-menu-item-text">Messages</span>
                {unreadCount > 0 && <span className="menu-badge">{unreadCount}</span>}
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/user/orders')}
              >
                <IonIcon icon={listOutline} />
                <span className="navbar-menu-item-text">My Orders</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/activities')}
              >
                <IonIcon icon={timeOutline} />
                <span className="navbar-menu-item-text">Activities</span>
              </button>

              <div className="navbar-menu-divider" />

              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/user/profile')}
              >
                <IonIcon icon={personOutline} />
                <span className="navbar-menu-item-text">My Profile</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/user/settings')}
              >
                <IonIcon icon={settingsOutline} />
                <span className="navbar-menu-item-text">Settings</span>
              </button>

              <div className="navbar-menu-divider" />

              <button 
                className="navbar-menu-item navbar-menu-item-danger"
                onClick={handleLogout}
              >
                <IonIcon icon={logOutOutline} />
                <span className="navbar-menu-item-text">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </IonHeader>
  );
};

export default UserNavBar;
