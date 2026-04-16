// src/layouts/VendorLayout.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonFooter,
  IonText,
} from '@ionic/react';
import {
  gridOutline,
  receiptOutline,
  bagOutline,
  barChartOutline,
  walletOutline,
  starOutline,
  chatbubbleOutline,
  settingsOutline,
  logOutOutline,
  searchOutline,
  notificationsOutline,
  moonOutline,
  sunnyOutline,
  personCircleOutline,
  menuOutline,
  closeOutline,
} from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './VendorLayout.css';

interface VendorLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children, pageTitle = 'Dashboard' }) => {
  const ionRouter = useIonRouter();
  const location = useLocation();
  const { user, role, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const isVendor = role === 'vendor';
  const displayName = user?.name || 'Vendor';
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { path: '/vendor/dashboard', label: 'Dashboard', icon: gridOutline },
    { path: '/vendor/orders', label: 'Orders', icon: receiptOutline },
    { path: '/vendor/products', label: 'Products', icon: bagOutline },
    { path: '/vendor/inventory', label: 'Inventory', icon: barChartOutline },
    { path: '/vendor/earnings', label: 'Earnings', icon: walletOutline },
    { path: '/vendor/reviews', label: 'Reviews', icon: starOutline },
    { path: '/vendor/messages', label: 'Messages', icon: chatbubbleOutline },
    { path: '/vendor/settings', label: 'Settings', icon: settingsOutline },
  ];

  const handleLogout = () => {
    logout('vendor');
    ionRouter.push('/vendor/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="vendor-layout">
      {/* Top Navbar */}
      <IonHeader className="vendor-navbar">
        <IonToolbar className="vendor-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={toggleSidebar} fill="clear">
              <IonIcon icon={sidebarOpen ? closeOutline : menuOutline} />
            </IonButton>
          </IonButtons>

          <div className="navbar-title">
            <h1>{pageTitle}</h1>
          </div>

          <IonButtons slot="end" className="navbar-actions">
            <IonButton onClick={() => setSearchOpen(!searchOpen)} fill="clear">
              <IonIcon icon={searchOutline} />
            </IonButton>
            <IonButton fill="clear">
              <IonIcon icon={notificationsOutline} />
            </IonButton>
            <IonButton onClick={toggleTheme} fill="clear" title="Toggle theme">
              <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} />
            </IonButton>
            <IonButton id="profile-menu" onClick={() => setProfileMenuOpen(!profileMenuOpen)} fill="clear">
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        {/* Search Bar */}
        {searchOpen && (
          <IonToolbar className="search-toolbar">
            <div className="search-container">
              <IonIcon icon={searchOutline} />
              <input
                type="text"
                placeholder="Search orders, products..."
                className="search-input"
              />
            </div>
          </IonToolbar>
        )}
      </IonHeader>

      {/* Profile Dropdown */}
      {profileMenuOpen && (
        <div className="profile-menu-container">
          <div className="profile-menu-content">
            <div className="profile-header" onClick={() => ionRouter.push('/user/home')} style={{ cursor: 'pointer' }}>
              <div className="profile-avatar">👤</div>
              <div>
                <p className="profile-name">{displayName}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>
            <div className="profile-divider" />
            <button className="profile-menu-item" onClick={() => ionRouter.push('/vendor/settings')}>
              <IonIcon icon={settingsOutline} />
              <span>Settings</span>
            </button>
            <button className="profile-menu-item danger" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      <div className="vendor-layout-body">
        {/* Sidebar */}
        <aside className={`vendor-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="store-logo">🏪</div>
            <div className="store-info">
              <p className="store-name">{displayName}'s Store</p>
              <p className="store-category">Restaurant</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => ionRouter.push(item.path)}
              >
                <IonIcon icon={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="vendor-content">
          <IonContent>
            {children}
          </IonContent>
        </main>
      </div>

      {/* Footer */}
      <IonFooter className="vendor-footer">
        <div className="footer-content">
          <p>&copy; 2024 Riding App. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#support">Support</a>
          </div>
        </div>
      </IonFooter>
    </div>
  );
};

export default VendorLayout;
