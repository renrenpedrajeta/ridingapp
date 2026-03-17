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
  listOutline,
  briefcaseOutline,
  chatbubbleOutline,
  barChartOutline,
  personCircleOutline,
  logOutOutline,
  settingsOutline,
  sunnyOutline,
  moonOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';

interface VendorNavBarProps {
  title?: string;
}

/**
 * VendorNavBar - Navigation bar for vendor/restaurant owners
 * Features: Dashboard, Orders, Products, Messages, Analytics, Settings
 */
const VendorNavBar: React.FC<VendorNavBarProps> = ({ title = 'Vendor Dashboard' }) => {
  const history = useHistory();
  const { vendor, vendorLogout } = useVendorAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();
  const [showPopover, setShowPopover] = useState(false);

  const handleLogout = () => {
    vendorLogout();
    setShowPopover(false);
    history.push('/vendor/login');
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
          <IonButton onClick={() => history.push('/vendor/dashboard')}>
            <IonIcon
              icon={home}
              style={{ fontSize: '22px', color: '#10B981' }}
            />
          </IonButton>

          {/* Orders */}
          <IonButton onClick={() => history.push('/vendor/orders')}>
            <IonIcon
              icon={listOutline}
              style={{ fontSize: '22px', color: '#10B981' }}
            />
          </IonButton>

          {/* Products/Inventory */}
          <IonButton onClick={() => history.push('/vendor/inventory')}>
            <IonIcon
              icon={briefcaseOutline}
              style={{ fontSize: '22px', color: '#10B981' }}
            />
          </IonButton>

          {/* Messages */}
          <IonButton onClick={() => history.push('/vendor/messages')}>
            <div style={{ position: 'relative' }}>
              <IonIcon
                icon={chatbubbleOutline}
                style={{ fontSize: '22px', color: '#10B981' }}
              />
              {unreadCount > 0 && (
                <IonBadge color="danger" style={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </IonBadge>
              )}
            </div>
          </IonButton>

          {/* Earnings/Analytics */}
          <IonButton onClick={() => history.push('/vendor/earnings')}>
            <IonIcon
              icon={barChartOutline}
              style={{ fontSize: '22px', color: '#10B981' }}
            />
          </IonButton>

          {/* Theme Toggle */}
          <IonButton onClick={toggleTheme}>
            <IonIcon
              icon={isDarkMode ? sunnyOutline : moonOutline}
              style={{ fontSize: '22px', color: '#10B981' }}
            />
          </IonButton>

          {/* Profile Dropdown */}
          <IonButton id="vendor-profile-button" onClick={() => setShowPopover(true)}>
            <IonIcon
              icon={personCircleOutline}
              style={{ fontSize: '22px', color: '#10B981' }}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Profile Popover Menu */}
      <IonPopover
        trigger="vendor-profile-button"
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
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>{vendor?.fullName}</p>
          </div>

          {/* Profile Menu Items */}
          <IonItem 
            button 
            onClick={() => {
              history.push('/vendor/profile');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={personCircleOutline} slot="start" style={{ color: '#10B981', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>My Profile</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/vendor/orders');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={listOutline} slot="start" style={{ color: '#10B981', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>My Orders</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/vendor/products');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={briefcaseOutline} slot="start" style={{ color: '#10B981', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>Products</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/vendor/earnings');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={barChartOutline} slot="start" style={{ color: '#10B981', fontSize: '20px', marginRight: '12px' }} />
            <IonLabel>Earnings</IonLabel>
          </IonItem>

          <IonItem 
            button 
            onClick={() => {
              history.push('/vendor/settings');
              setShowPopover(false);
            }}
            style={{ '--padding-start': '12px', '--padding-end': '12px' } as any}
          >
            <IonIcon icon={settingsOutline} slot="start" style={{ color: '#10B981', fontSize: '20px', marginRight: '12px' }} />
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

export default VendorNavBar;
