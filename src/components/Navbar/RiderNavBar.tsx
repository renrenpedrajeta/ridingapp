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
  mapOutline,
  walletOutline,
  chatbubbleOutline,
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

interface RiderNavBarProps {
  title?: string;
}

/**
 * RiderNavBar - Navigation bar for riders/delivery partners
 * Features: Home, Active Deliveries, Earnings, Messages, Profile, Settings
 */
const RiderNavBar: React.FC<RiderNavBarProps> = ({ title = 'Rider Dashboard' }) => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();
  const [showPopover, setShowPopover] = useState(false);

  const handleLogout = () => {
    logout();
    setShowPopover(false);
    history.push('/rider/login');
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
          {/* Home Button */}
          <IonButton onClick={() => history.push('/rider/home')}>
            <IonIcon
              icon={home}
              style={{ fontSize: '22px', color: '#F59E0B' }}
            />
          </IonButton>

          {/* Active Deliveries/Orders Map */}
          <IonButton onClick={() => history.push('/rider/map')}>
            <IonIcon
              icon={mapOutline}
              style={{ fontSize: '22px', color: '#F59E0B' }}
            />
          </IonButton>

          {/* Earnings Button */}
          <IonButton onClick={() => history.push('/rider/earnings')}>
            <IonIcon
              icon={walletOutline}
              style={{ fontSize: '22px', color: '#F59E0B' }}
            />
          </IonButton>

          {/* Messages Button */}
          <IonButton onClick={() => history.push('/rider/messages')}>
            <div style={{ position: 'relative' }}>
              <IonIcon
                icon={chatbubbleOutline}
                style={{ fontSize: '22px', color: '#F59E0B' }}
              />
              {unreadCount > 0 && (
                <IonBadge color="danger" style={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </IonBadge>
              )}
            </div>
          </IonButton>

          {/* Theme Toggle */}
          <IonButton onClick={toggleTheme}>
            <IonIcon
              icon={isDarkMode ? sunnyOutline : moonOutline}
              style={{ fontSize: '22px', color: '#F59E0B' }}
            />
          </IonButton>

          {/* Profile Dropdown */}
          <IonButton id="rider-profile-button" onClick={() => setShowPopover(true)}>
            <IonIcon
              icon={personCircleOutline}
              style={{ fontSize: '22px', color: '#F59E0B' }}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Profile Popover Menu */}
      <IonPopover
        trigger="rider-profile-button"
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
              history.push('/rider/profile');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={personCircleOutline} slot="start" style={{ color: '#F59E0B', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>My Profile</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/rider/orders');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={listOutline} slot="start" style={{ color: '#F59E0B', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>My Deliveries</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/rider/earnings');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={walletOutline} slot="start" style={{ color: '#F59E0B', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>Earnings</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/rider/settings');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={settingsOutline} slot="start" style={{ color: '#F59E0B', fontSize: '20px', marginRight: '12px' }} />
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

export default RiderNavBar;
