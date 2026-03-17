import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonPopover,
  IonItem,
  IonList,
  IonLabel,
} from '@ionic/react';
import {
  home,
  peopleOutline,
  statsChartOutline,
  listOutline,
  warningOutline,
  personCircleOutline,
  logOutOutline,
  settingsOutline,
  sunnyOutline,
  moonOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface AdminNavBarProps {
  title?: string;
}

/**
 * AdminNavBar - Navigation bar for admin users
 * Features: Dashboard, Users, Riders, Orders, Reports, Settings
 */
const AdminNavBar: React.FC<AdminNavBarProps> = ({ title = 'Admin Dashboard' }) => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showPopover, setShowPopover] = useState(false);

  const handleLogout = () => {
    logout();
    setShowPopover(false);
    history.push('/admin/login');
  };

  return (
    <IonHeader>
      <IonToolbar
        style={{
          '--background': 'var(--ion-card-background)',
          borderBottom: '1px solid var(--ion-border-color)',
        } as any}
      >
        <IonTitle
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ion-text-color)',
          }}
        >
          {title}
        </IonTitle>

        <IonButtons slot="end">
          {/* Dashboard Button */}
          <IonButton onClick={() => history.push('/admin/dashboard')}>
            <IonIcon
              icon={home}
              style={{ fontSize: '22px', color: '#EF4444' }}
            />
          </IonButton>

          {/* Users Management */}
          <IonButton onClick={() => history.push('/admin/users')}>
            <IonIcon
              icon={peopleOutline}
              style={{ fontSize: '22px', color: '#EF4444' }}
            />
          </IonButton>

          {/* Reports/Analytics */}
          <IonButton onClick={() => history.push('/admin/reports')}>
            <IonIcon
              icon={statsChartOutline}
              style={{ fontSize: '22px', color: '#EF4444' }}
            />
          </IonButton>

          {/* Orders List */}
          <IonButton onClick={() => history.push('/admin/orders')}>
            <IonIcon
              icon={listOutline}
              style={{ fontSize: '22px', color: '#EF4444' }}
            />
          </IonButton>

          {/* Reports/Issues */}
          <IonButton onClick={() => history.push('/admin/reported-issues')}>
            <IonIcon
              icon={warningOutline}
              style={{ fontSize: '22px', color: '#EF4444' }}
            />
          </IonButton>

          {/* Theme Toggle */}
          <IonButton onClick={toggleTheme}>
            <IonIcon
              icon={isDarkMode ? sunnyOutline : moonOutline}
              style={{ fontSize: '22px', color: '#EF4444' }}
            />
          </IonButton>

          {/* Profile Dropdown */}
          <IonButton id="admin-profile-button" onClick={() => setShowPopover(true)}>
            <IonIcon
              icon={personCircleOutline}
              style={{ fontSize: '22px', color: '#EF4444' }}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Profile Popover Menu */}
      <IonPopover
        trigger="admin-profile-button"
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
        side="bottom"
        alignment="end"
        className="profile-popover"
      >
        <IonList style={{ minWidth: '240px', padding: 0 }}>
          {/* User Info Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--ion-border-color)',
            background: 'var(--ion-card-background)',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Logged in as</p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>{user?.name}</p>
          </div>

          {/* Profile Menu Items */}
          <IonItem 
            button 
            onClick={() => {
              history.push('/admin/profile');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={personCircleOutline} slot="start" style={{ color: '#EF4444', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>My Profile</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/admin/orders');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={listOutline} slot="start" style={{ color: '#EF4444', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>All Orders</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/admin/users');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={peopleOutline} slot="start" style={{ color: '#EF4444', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>Users</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/admin/reports');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={statsChartOutline} slot="start" style={{ color: '#EF4444', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>Reports</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/admin/settings');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={settingsOutline} slot="start" style={{ color: '#EF4444', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>Settings</IonLabel>
          </IonItem>

          {/* Separator */}
          <div style={{ height: '1px', background: 'var(--ion-border-color)', margin: '8px 0' }} />

          {/* Logout */}
          <IonItem 
            button 
            onClick={handleLogout}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={logOutOutline} slot="start" style={{ color: '#EF4444', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel style={{ color: '#EF4444' }}>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonHeader>
  );
};

export default AdminNavBar;
