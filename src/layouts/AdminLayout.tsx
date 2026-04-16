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
} from '@ionic/react';
import {
  homeOutline,
  peopleOutline,
  statsChartOutline,
  listOutline,
  warningOutline,
  personCircleOutline,
  logOutOutline,
  settingsOutline,
  searchOutline,
  notificationsOutline,
  moonOutline,
  sunnyOutline,
  menuOutline,
  closeOutline,
} from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './AdminLayout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, pageTitle = 'Dashboard' }) => {
  const ionRouter = useIonRouter();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: homeOutline },
    { path: '/admin/users', label: 'Users', icon: peopleOutline },
    { path: '/admin/reports', label: 'Analytics', icon: statsChartOutline },
    { path: '/admin/orders', label: 'Orders', icon: listOutline },
    { path: '/admin/reported-issues', label: 'Issues', icon: warningOutline },
    { path: '/admin/settings', label: 'Settings', icon: settingsOutline },
  ];

  const handleLogout = () => {
    logout('admin');
    ionRouter.push('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Top Navbar */}
      <IonHeader className="admin-navbar">
        <IonToolbar className="admin-toolbar">
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
                placeholder="Search users, orders..."
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
                <p className="profile-role">Administrator</p>
              </div>
            </div>
            <div className="profile-divider" />
            <button className="profile-menu-item" onClick={() => ionRouter.push('/admin/profile')}>
              <IonIcon icon={personCircleOutline} />
              <span>Profile</span>
            </button>
            <button className="profile-menu-item" onClick={() => ionRouter.push('/admin/settings')}>
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

      <div className="admin-layout-body">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="admin-logo">⚙️</div>
            <div className="admin-info">
              <p className="admin-name">Admin Panel</p>
              <p className="admin-tagline">System Management</p>
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
        <main className="admin-content">
          <IonContent>
            {children}
          </IonContent>
        </main>
      </div>

      {/* Footer */}
      <IonFooter className="admin-footer">
        <div className="footer-content">
          <p>&copy; 2024 Riding App - Admin Dashboard. All rights reserved.</p>
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

export default AdminLayout;
