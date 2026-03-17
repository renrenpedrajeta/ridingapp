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
  cartOutline,
  chatbubbleOutline,
  timeOutline,
  personCircleOutline,
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
import '../../styles/mobile-first-responsive.css';

interface UserNavBarProps {
  title?: string;
  showCart?: boolean;
  cartCount?: number;
}

/**
 * UserNavBar - Navigation bar for regular users
 * Features: Home, Cart, Messages, Activities, Profile, Settings
 */
const UserNavBar: React.FC<UserNavBarProps> = ({
  title = 'RiderApp',
  showCart = true,
  cartCount = 0,
}) => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();
  const [showPopover, setShowPopover] = useState(false);

  const handleLogout = () => {
    logout();
    setShowPopover(false);
    history.push('/login');
  };

  return (
    <IonHeader>
      <IonToolbar
        style={{
          '--background': 'var(--ion-card-background)',
          borderBottom: '1px solid var(--ion-border-color)',
          padding: '8px 0',
        } as any}
      >
        <IonTitle
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--ion-text-color)',
            paddingLeft: '12px',
          }}
          className="navbar-title-mobile"
        >
          {title}
        </IonTitle>

        <IonButtons slot="end" className="navbar-buttons-mobile">
          {/* Profile Dropdown - Only button on navbar */}
          <IonButton id="user-profile-button" onClick={() => setShowPopover(true)} className="navbar-icon-button">
            <IonIcon
              icon={personCircleOutline}
              style={{ fontSize: '20px', color: '#6366F1' }}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Profile Popover Menu */}
      <IonPopover
        trigger="user-profile-button"
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
        side="bottom"
        alignment="end"
        className="profile-popover popover-menu-mobile"
      >
        <IonList style={{ minWidth: '220px', padding: 0 }}>
          {/* User Info Header */}
          <div style={{
            padding: '12px',
            borderBottom: '1px solid var(--ion-border-color)',
            background: 'var(--ion-card-background)',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'var(--ion-text-color-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Logged in as</p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--ion-text-color)' }}>{user?.name}</p>
          </div>

          {/* Navigation Items */}
          <IonItem 
            button 
            onClick={() => {
              history.push('/user/home');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={home} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>Home</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/user/cart');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={cartOutline} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>Cart {cartCount > 0 && `(${cartCount})`}</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/messages');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={chatbubbleOutline} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>Messages {unreadCount > 0 && `(${unreadCount})`}</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/activities');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={timeOutline} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>Activities</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/user/profile');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={personCircleOutline} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>My Profile</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/user/orders');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={listOutline} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>My Orders</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/user/settings');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={settingsOutline} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>Settings</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              toggleTheme();
              setShowPopover(false);
            }}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} slot="start" style={{ color: '#6366F1', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ fontSize: '13px' }}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</IonLabel>
          </IonItem>

          {/* Separator */}
          <div style={{ height: '1px', background: 'var(--ion-border-color)', margin: '8px 0' }} />

          {/* Logout */}
          <IonItem 
            button 
            onClick={handleLogout}
            style={{ '--padding-start': '10px', '--padding-end': '10px' } as any}
          >
            <IonIcon icon={logOutOutline} slot="start" style={{ color: '#EF4444', fontSize: '18px', marginRight: '10px' }} />
            <IonLabel style={{ color: '#EF4444', fontSize: '13px' }}>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonHeader>
  );
};

export default UserNavBar;
