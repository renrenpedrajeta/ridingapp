import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonFooter,
} from '@ionic/react';
import {
  homeOutline,
  mapOutline,
  walletOutline,
  chatbubbleOutline,
  personCircleOutline,
  logOutOutline,
  settingsOutline,
  searchOutline,
  notificationsOutline,
  moonOutline,
  sunnyOutline,
  menuOutline,
  closeOutline,
  statsChartOutline,
} from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';
import './RiderLayout.css';

interface RiderLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const RiderLayout: React.FC<RiderLayoutProps> = ({ children, pageTitle = 'Dashboard' }) => {
  const history = useHistory();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { path: '/rider/home', label: 'Home', icon: homeOutline },
    { path: '/rider/map', label: 'Active Deliveries', icon: mapOutline },
    { path: '/rider/earnings', label: 'Earnings', icon: walletOutline },
    { path: '/rider/stats', label: 'Statistics', icon: statsChartOutline },
    { path: '/rider/messages', label: 'Messages', icon: chatbubbleOutline },
    { path: '/rider/profile', label: 'Profile', icon: personCircleOutline },
    { path: '/rider/settings', label: 'Settings', icon: settingsOutline },
  ];

  const handleLogout = () => {
    logout();
    history.push('/rider/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="rider-layout">
      {/* Top Navbar */}
      <IonHeader className="rider-navbar">
        <IonToolbar className="rider-toolbar">
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
              <IonIcon
                icon={notificationsOutline}
                style={{
                  position: 'relative',
                }}
              />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: '#EF4444',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
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
                placeholder="Search orders..."
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
            <div className="profile-header" style={{ cursor: 'pointer' }}>
              <div className="profile-avatar">👤</div>
              <div>
                <p className="profile-name">{user?.name}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>
            <div className="profile-divider" />
            <button className="profile-menu-item" onClick={() => history.push('/rider/profile')}>
              <IonIcon icon={personCircleOutline} />
              <span>Profile</span>
            </button>
            <button className="profile-menu-item" onClick={() => history.push('/rider/settings')}>
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

      <div className="rider-layout-body">
        {/* Sidebar */}
        <aside className={`rider-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="rider-logo">🚴</div>
            <div className="rider-info">
              <p className="rider-name">Rider Hub</p>
              <p className="rider-tagline">Delivery Partner</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => history.push(item.path)}
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
        <main className="rider-content">
          <IonContent>
            {children}
          </IonContent>
        </main>
      </div>

      {/* Footer */}
      <IonFooter className="rider-footer">
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

export default RiderLayout;
