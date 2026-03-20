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
import { settingsOutline, notificationsOutline, moonOutline, globeOutline, lockClosedOutline, informationCircleOutline, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const UserSettings: React.FC = () => {
  const history = useHistory();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  // Protect this page - redirect if not logged in
  if (!user || (user.role !== 'user' && user.role !== 'rider')) {
    history.replace('/login');
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
    logout();
    history.push('/guest/home');
  };

  return (
    <IonPage>
      <PageHeader 
        title="Settings" 
        showBack={false}
        isLoggedIn={true}
        onHomeClick={() => history.push('/user/home')}
        onProfileClick={() => history.push('/user/profile')}
        onSettingsClick={() => history.push('/user/settings')}
        onLogoutClick={() => {
          logout();
          history.push('/guest/home');
        }}
      />

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ padding: '16px' }}>
          {/* Notifications Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IonIcon icon={notificationsOutline} style={{ fontSize: '18px' }} />
              Notifications
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '12px 0' }}>
                <IonItem lines="inset" style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
                    All Notifications
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.notificationsEnabled}
                    onIonChange={(e) => handleSettingChange('notificationsEnabled', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem lines="inset" style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
                    Order Updates
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.orderUpdates}
                    onIonChange={(e) => handleSettingChange('orderUpdates', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem lines="inset" style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
                    Email Notifications
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.emailNotifications}
                    onIonChange={(e) => handleSettingChange('emailNotifications', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem lines="none" style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
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
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IonIcon icon={globeOutline} style={{ fontSize: '18px' }} />
              Preferences
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '12px 0' }}>
                <IonItem style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
                    Dark Mode
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={isDarkMode}
                    onIonChange={(e) => toggleTheme()}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
                    Language
                  </IonLabel>
                  <IonSelect
                    slot="end"
                    value={settings.language}
                    onIonChange={(e) => handleSettingChange('language', e.detail.value)}
                    style={{ color: 'var(--ion-text-color)' }}
                  >
                    <IonSelectOption value="en">English</IonSelectOption>
                    <IonSelectOption value="tl">Filipino</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Privacy & Security Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IonIcon icon={lockClosedOutline} style={{ fontSize: '18px' }} />
              Privacy & Security
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '12px 0' }}>
                <IonItem lines="inset" style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
                    Location Sharing
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={settings.locationSharing}
                    onIonChange={(e) => handleSettingChange('locationSharing', e.detail.checked)}
                    style={{ marginRight: '0' }}
                  />
                </IonItem>
                <IonItem style={{ '--background': 'transparent' } as any}>
                  <IonLabel style={{ fontSize: '14px', color: 'var(--ion-text-color)' }}>
                    Change Password
                  </IonLabel>
                  <IonButton
                    fill="outline"
                    size="small"
                    slot="end"
                    style={{ '--color': 'var(--ion-color-primary)', marginRight: '0' }}
                    onClick={() => history.push('/user/change-password')}
                  >
                    Change
                  </IonButton>
                </IonItem>
              </IonCardContent>
            </IonCard>
          </div>

          {/* About Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--ion-text-color)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IonIcon icon={informationCircleOutline} style={{ fontSize: '18px' }} />
              About
            </h3>
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '12px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
                    App Version
                  </p>
                  <p style={{ margin: 0, color: 'var(--ion-text-color)', fontWeight: 600 }}>
                    1.0.0
                  </p>
                </div>
                <IonButton
                  expand="block"
                  fill="outline"
                  style={{
                    '--color': 'var(--ion-color-primary)',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}
                >
                  Terms of Service
                </IonButton>
                <IonButton
                  expand="block"
                  fill="outline"
                  style={{
                    '--color': 'var(--ion-color-primary)',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  Privacy Policy
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>

          {/* Danger Zone */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--ion-color-danger)',
              marginBottom: '12px',
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
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                height: '40px'
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
                fontSize: '14px',
                fontWeight: 600,
                height: '40px'
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
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
