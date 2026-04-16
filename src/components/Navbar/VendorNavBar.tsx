import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import {
  home,
  listOutline,
  bagOutline,
  chatbubbleOutline,
  barChartOutline,
  starOutline,
  personCircleOutline,
  personOutline,
  logOutOutline,
  settingsOutline,
  sunnyOutline,
  moonOutline,
} from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import '../Navbar.css';

interface VendorNavBarProps {
  title?: string;
}

const VendorNavBar: React.FC<VendorNavBarProps> = ({ title = 'Vendor Dashboard' }) => {
  const ionRouter = useIonRouter();
  const { user, role, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isVendor = role === 'vendor';
  const displayName = user?.name || 'Vendor';

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    ionRouter.push('/vendor/login');
  };

  const navigateTo = (path: string) => {
    setShowUserMenu(false);
    ionRouter.push(path);
  };

  return (
    <IonHeader className="navbar-header">
      <IonToolbar className="navbar-toolbar">
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <a 
            className="navbar-logo-btn"
            onClick={(e) => {
              e.preventDefault();
              ionRouter.push('/vendor/dashboard');
            }}
            href="/vendor/dashboard"
          >
            <span className="navbar-logo">
              <span className="logo-primary">Vendor</span>
              <span className="logo-secondary">Panel</span>
            </span>
          </a>
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
            onClick={() => ionRouter.push('/vendor/messages')}
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
            {/* User Info Header */}
            <div className="navbar-user-header" style={{ background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>
              <div className="navbar-user-avatar">
                <IonIcon icon={personCircleOutline} />
              </div>
              <div className="navbar-user-info">
                <p className="navbar-user-name">{displayName}</p>
                <p className="navbar-user-email">{user?.email || ''}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="navbar-menu-items">
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/dashboard')}
              >
                <IonIcon icon={home} />
                <span>Dashboard</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/orders')}
              >
                <IonIcon icon={listOutline} />
                <span>Orders</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/products')}
              >
                <IonIcon icon={bagOutline} />
                <span>Products</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/inventory')}
              >
                <IonIcon icon={barChartOutline} />
                <span>Inventory</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/earnings')}
              >
                <IonIcon icon={barChartOutline} />
                <span>Earnings</span>
              </button>

              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/reviews')}
              >
                <IonIcon icon={starOutline} />
                <span>Reviews</span>
              </button>

              <div className="navbar-menu-divider" />

              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/profile')}
              >
                <IonIcon icon={personOutline} />
                <span>My Profile</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/vendor/settings')}
              >
                <IonIcon icon={settingsOutline} />
                <span>Settings</span>
              </button>

              <div className="navbar-menu-divider" />

              <button 
                className="navbar-menu-item navbar-menu-item-danger"
                onClick={handleLogout}
              >
                <IonIcon icon={logOutOutline} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </IonHeader>
  );
};

export default VendorNavBar;
