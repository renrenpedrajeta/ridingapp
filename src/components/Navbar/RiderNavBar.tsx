import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import {
  home,
  mapOutline,
  walletOutline,
  chatbubbleOutline,
  personCircleOutline,
  personOutline,
  logOutOutline,
  settingsOutline,
  sunnyOutline,
  moonOutline,
  listOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import '../Navbar.css';

interface RiderNavBarProps {
  title?: string;
}

const RiderNavBar: React.FC<RiderNavBarProps> = ({ title }) => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    history.push('/rider/login');
  };

  const navigateTo = (path: string) => {
    setShowUserMenu(false);
    history.push(path);
  };

  return (
    <IonHeader className="navbar-header">
      <IonToolbar className="navbar-toolbar">
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <button 
            className="navbar-logo-btn"
            onClick={() => history.push('/rider/home')}
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
            onClick={() => history.push('/rider/messages')}
            aria-label="Messages"
          >
            <IonIcon icon={chatbubbleOutline} />
            {unreadCount > 0 && (
              <span className="navbar-cart-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
            )}
          </button>

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
            <div className="navbar-user-header" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <div className="navbar-user-avatar">
                <IonIcon icon={personCircleOutline} />
              </div>
              <div className="navbar-user-info">
                <p className="navbar-user-name">{user?.name || 'Rider'}</p>
                <p className="navbar-user-email">{user?.email || ''}</p>
              </div>
            </div>

            <div className="navbar-menu-items">
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/rider/home')}
              >
                <IonIcon icon={home} />
                <span className="navbar-menu-item-text">Dashboard</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/rider/orders')}
              >
                <IonIcon icon={listOutline} />
                <span className="navbar-menu-item-text">My Deliveries</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/rider/earnings')}
              >
                <IonIcon icon={walletOutline} />
                <span className="navbar-menu-item-text">Earnings</span>
              </button>

              <div className="navbar-menu-divider" />

              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/rider/profile')}
              >
                <IonIcon icon={personOutline} />
                <span className="navbar-menu-item-text">My Profile</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/rider/settings')}
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

export default RiderNavBar;
