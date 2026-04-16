// src/pages/User/Settings.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonToggle,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonAlert,
} from '@ionic/react';
import { notificationsOutline, moonOutline, globeOutline, lockClosedOutline, informationCircleOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

const UserSettings: React.FC = () => {
  const ionRouter = useIonRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const { getAuthUser, logout } = useAuth();

  const currentUser = getAuthUser('user');

  // Protect this page - redirect if not logged in
  if (!currentUser) {
    ionRouter.push('/login');
    return null;
  }
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    locationSharing: true,
    language: 'en',
    orderUpdates: true,
    promotionalEmails: false,
  });
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleResetData = () => {
    setShowResetAlert(false);
    // Reset logic here
    console.log('Data reset');
  };

  const handleLogout = () => {
    logout('user');
    ionRouter.push('/guest/home');
  };

  return (
    <IonPage>
      <IonContent className="content-with-sticky-footer ion-page-with-bottom-nav" style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Logo Header */}
        <LogoHeader />

        <div style={{ padding: '12px' }}>
          {/* Notifications Section */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <IonIcon icon={notificationsOutline} style={{ fontSize: '16px' }} />
              Notifications
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '8px 0' }}>
                <IonItem lines="inset" style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    All Notifications
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.notificationsEnabled}
                    onIonChange={(e) => handleSettingChange('notificationsEnabled', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem lines="inset" style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    Order Updates
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.orderUpdates}
                    onIonChange={(e) => handleSettingChange('orderUpdates', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem lines="inset" style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    Email Notifications
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.emailNotifications}
                    onIonChange={(e) => handleSettingChange('emailNotifications', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem lines="none" style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    Push Notifications
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.pushNotifications}
                    onIonChange={(e) => handleSettingChange('pushNotifications', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Preferences Section */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <IonIcon icon={globeOutline} style={{ fontSize: '16px' }} />
              Preferences
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '8px 0' }}>
                <IonItem style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    Dark Mode
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={isDarkMode}
                    onIonChange={(e) => toggleTheme()}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    Language
                  </IonLabel>
                  <IonSelect
                    slot="end"
                    value={settings.language}
                    onIonChange={(e) => handleSettingChange('language', e.detail.value)}
                    style={{ color: 'var(--ion-text-color)', fontSize: '12px' }}
                  >
                    <IonSelectOption value="en">English</IonSelectOption>
                    <IonSelectOption value="tl">Filipino</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Privacy & Security Section */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <IonIcon icon={lockClosedOutline} style={{ fontSize: '16px' }} />
              Privacy & Security
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '8px 0' }}>
                <IonItem lines="inset" style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    Location Sharing
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.locationSharing}
                    onIonChange={(e) => handleSettingChange('locationSharing', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem style={{ '--background': 'transparent', '--padding-start': '10px', '--padding-end': '10px', '--inner-padding-end': '0', '--min-height': '40px' } as any}>
                  <IonLabel style={{ fontSize: '12px', color: 'var(--ion-text-color)' }}>
                    Change Password
                  </IonLabel>
                  <IonButton
                    fill="outline"
                    size="small"
                    slot="end"
                    style={{ '--color': 'var(--ion-color-primary)', marginRight: '0', fontSize: '11px', height: '30px' }}
                    onClick={() => ionRouter.push('/user/change-password')}
                  >
                    Change
                  </IonButton>
                </IonItem>
              </IonCardContent>
            </IonCard>
          </div>

          {/* About Section */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <IonIcon icon={informationCircleOutline} style={{ fontSize: '16px' }} />
              About
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '8px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '10px', color: 'var(--ion-text-color-secondary)' }}>
                    App Version
                  </p>
                  <p style={{ margin: 0, color: 'var(--ion-text-color)', fontWeight: 600, fontSize: '12px' }}>
                    1.0.0
                  </p>
                </div>
                <IonButton
                  expand="block"
                  fill="outline"
                  style={{
                    '--color': 'var(--ion-color-primary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    height: '32px'
                  }}
                >
                  Terms of Service
                </IonButton>
                <IonButton
                  expand="block"
                  fill="outline"
                  style={{
                    '--color': 'var(--ion-color-primary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    height: '32px'
                  }}
                >
                  Privacy Policy
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Danger Zone */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--ion-color-danger)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              Danger Zone
            </h3>
            <IonButton
              expand="block"
              color="danger"
              fill="outline"
              style={{
                '--border-color': '#EF5350',
                '--color': '#EF5350',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '8px',
                height: '36px'
              }}
              onClick={() => setShowResetAlert(true)}
            >
              Reset Data
            </IonButton>
            <IonButton
              expand="block"
              color="danger"
              style={{
                '--background': '#EF5350',
                fontSize: '12px',
                fontWeight: 600,
                height: '36px'
              }}
              onClick={() => setShowLogoutAlert(true)}
            >
              Sign Out
            </IonButton>
          </div>
        </div>

        <IonAlert
          isOpen={showResetAlert}
          onDidDismiss={() => setShowResetAlert(false)}
          header="Reset Data"
          message="Are you sure you want to reset all your data? This action cannot be undone."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Reset',
              role: 'destructive',
              handler: handleResetData,
            },
          ]}
        />

        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Sign Out"
          message="Are you sure you want to sign out?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Sign Out',
              role: 'destructive',
              handler: handleLogout,
            },
          ]}
        />

        {/* Bottom Navigation */}
        <BottomNav type="user" activeTab="profile" />
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
