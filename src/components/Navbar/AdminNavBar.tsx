import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import {
  home,
  peopleOutline,
  bicycleOutline,
  listOutline,
  warningOutline,
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
import '../Navbar.css';

interface AdminNavBarProps {
  title?: string;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ title }) => {
  const ionRouter = useIonRouter();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    ionRouter.push('/admin/login');
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
          <button 
            className="navbar-logo-btn"
            onClick={() => ionRouter.push('/admin/dashboard')}
          >
            <span className="navbar-logo">
              <span className="logo-primary">Admin</span>
              <span className="logo-secondary">Panel</span>
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
            <div className="navbar-user-header" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}>
              <div className="navbar-user-avatar">
                <IonIcon icon={personCircleOutline} />
              </div>
              <div className="navbar-user-info">
                <p className="navbar-user-name">{user?.name || 'Admin'}</p>
                <p className="navbar-user-email">{user?.email || ''}</p>
              </div>
            </div>

            <div className="navbar-menu-items">
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/admin/dashboard')}
              >
                <IonIcon icon={home} />
                <span className="navbar-menu-item-text">Dashboard</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/admin/users')}
              >
                <IonIcon icon={peopleOutline} />
                <span className="navbar-menu-item-text">Users</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/admin/riders')}
              >
                <IonIcon icon={bicycleOutline} />
                <span className="navbar-menu-item-text">Riders</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/admin/orders')}
              >
                <IonIcon icon={listOutline} />
                <span className="navbar-menu-item-text">All Orders</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/admin/reports')}
              >
                <IonIcon icon={warningOutline} />
                <span className="navbar-menu-item-text">Reports</span>
              </button>

              <div className="navbar-menu-divider" />

              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/admin/profile')}
              >
                <IonIcon icon={personOutline} />
                <span className="navbar-menu-item-text">My Profile</span>
              </button>
              
              <button 
                className="navbar-menu-item"
                onClick={() => navigateTo('/admin/settings')}
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

export default AdminNavBar;
