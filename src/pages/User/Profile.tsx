// src/pages/User/Profile.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { personOutline, mailOutline, callOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

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
      <IonContent className="content-with-sticky-footer ion-page-with-bottom-nav" style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Logo Header */}
        <LogoHeader />

        <div style={{ padding: '12px' }} className="mobile-container-lg">
          {/* Profile Avatar Section */}
          <div className="profile-section-mobile" style={{ paddingTop: '8px', marginBottom: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              margin: '0 auto 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IonIcon 
                icon={personOutline} 
                style={{ fontSize: '30px', color: '#FFFFFF' }} 
              />
            </div>
            <h1 className="mobile-h2" style={{ 
              color: 'var(--ion-text-color)',
              margin: '0 0 2px 0',
              fontSize: '18px'
            }}>
              {profile.name}
            </h1>
            <p style={{ 
              fontSize: '11px', 
              color: 'var(--ion-text-color-secondary)',
              margin: 0
            }}>
              Member since 2024
            </p>
          </div>

          {/* Profile Information */}
          <div className="mobile-card" style={{marginBottom: '12px', padding: '12px'}}>
            <h3 style={{ 
              fontSize: '11px', 
              fontWeight: 600, 
              color: 'var(--ion-text-color)', 
              marginBottom: '10px',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>
              Contact Info
            </h3>

            <div className="form-group-mobile" style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <IonIcon icon={personOutline} style={{ marginRight: '6px', color: '#6366F1', fontSize: '16px' }} />
                <label style={{ fontSize: '11px', color: 'var(--ion-text-color-secondary)' }}>Name</label>
              </div>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="form-input-mobile"
                style={{
                  borderRadius: '6px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  padding: '8px 10px',
                  fontSize: '13px',
                  height: '36px'
                }}
              />
            </div>

            <div className="form-group-mobile" style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <IonIcon icon={mailOutline} style={{ marginRight: '6px', color: '#6366F1', fontSize: '16px' }} />
                <label style={{ fontSize: '11px', color: 'var(--ion-text-color-secondary)' }}>Email</label>
              </div>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="form-input-mobile"
                style={{
                  borderRadius: '6px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  padding: '8px 10px',
                  fontSize: '13px',
                  height: '36px'
                }}
              />
            </div>

            <div className="form-group-mobile">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <IonIcon icon={callOutline} style={{ marginRight: '6px', color: '#6366F1', fontSize: '16px' }} />
                <label style={{ fontSize: '11px', color: 'var(--ion-text-color-secondary)' }}>Phone</label>
              </div>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="form-input-mobile"
                style={{
                  borderRadius: '6px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  padding: '8px 10px',
                  fontSize: '13px',
                  height: '36px'
                }}
              />
            </div>
          </div>

          {/* Quick Access Menu */}
          <div className="quick-access-mobile" style={{marginBottom: '12px'}}>
            <div 
              onClick={() => history.push('/activities')}
              style={{
                padding: '8px 6px',
                background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px'
              }}
            >
              <div style={{ fontSize: '16px', marginBottom: '2px' }}>📋</div>
              <p style={{ margin: 0, fontSize: '9px', fontWeight: 600 }}>Activity</p>
            </div>
            <div 
              onClick={() => history.push('/messages')}
              style={{
                padding: '8px 6px',
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px'
              }}
            >
              <div style={{ fontSize: '16px', marginBottom: '2px' }}>💬</div>
              <p style={{ margin: 0, fontSize: '9px', fontWeight: 600 }}>Messages</p>
            </div>
            <div 
              onClick={() => history.push('/report')}
              style={{
                padding: '8px 6px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                color: '#1F2937',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px'
              }}
            >
              <div style={{ fontSize: '16px', marginBottom: '2px' }}>⚠️</div>
              <p style={{ margin: 0, fontSize: '9px', fontWeight: 600 }}>Report</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <IonButton
              expand="block"
              style={{
                '--background': '#6366F1',
                '--border-radius': '6px',
                height: '40px',
                fontSize: '13px',
                fontWeight: 600
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
                '--border-radius': '6px',
                height: '40px',
                fontSize: '13px',
                fontWeight: 600
              }}
              onClick={() => {logout(); history.push('/login');}}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              Sign Out
            </IonButton>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav type="user" activeTab="profile" />
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
