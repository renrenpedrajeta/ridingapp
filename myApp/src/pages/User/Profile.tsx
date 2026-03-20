// src/pages/User/Profile.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { personOutline, mailOutline, callOutline, logOutOutline, settingsOutline, documentTextOutline, chatbubbleOutline, alertCircleOutline } from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useAuth } from '../../context/AuthContext';

const UserProfile: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const history = useHistory();

  // Protect this page - redirect if not logged in
  if (!user || (user.role !== 'user' && user.role !== 'rider')) {
    history.replace('/login');
    return null;
  }
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+63 912 123 4567'
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <IonPage>
      <PageHeader 
        title="My Profile" 
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
        <div style={{ padding: '24px 16px' }}>
          {/* Profile Avatar Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px',
            paddingTop: '16px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IonIcon 
                icon={personOutline} 
                style={{ fontSize: '40px', color: '#FFFFFF' }} 
              />
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: 'var(--ion-text-color)',
              margin: '0 0 8px 0'
            }}>
              {profile.name}
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--ion-text-color-secondary)',
              margin: 0
            }}>
              Member since 2024
            </p>
          </div>

          {/* Profile Information */}
          <div style={{
            background: 'var(--ion-card-background)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid var(--ion-border-color)'
          }}>
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--ion-text-color)', 
              marginBottom: '16px',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>
              Contact Information
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <IonIcon icon={personOutline} style={{ marginRight: '8px', color: '#6366F1' }} />
                <label style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Full Name</label>
              </div>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <IonIcon icon={mailOutline} style={{ marginRight: '8px', color: '#6366F1' }} />
                <label style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Email</label>
              </div>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <IonIcon icon={callOutline} style={{ marginRight: '8px', color: '#6366F1' }} />
                <label style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Phone</label>
              </div>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Quick Access Menu */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div 
              onClick={() => history.push('/activities')}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>📋</div>
              <p style={{ margin: 0, fontSize: '10px', fontWeight: 600 }}>Activity</p>
            </div>
            <div 
              onClick={() => history.push('/messages')}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>💬</div>
              <p style={{ margin: 0, fontSize: '10px', fontWeight: 600 }}>Messages</p>
            </div>
            <div 
              onClick={() => history.push('/report')}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                color: '#1F2937'
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>⚠️</div>
              <p style={{ margin: 0, fontSize: '10px', fontWeight: 600 }}>Report</p>
            </div>
          </div>

          {/* Action Buttons */}
          <IonButton
            expand="block"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px'
            }}
            onClick={() => history.push('/user/settings')}
          >
            <IonIcon icon={settingsOutline} slot="start" />
            Settings
          </IonButton>

          <IonButton
            expand="block"
            color="danger"
            style={{
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600
            }}
            onClick={handleLogout}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Sign Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
