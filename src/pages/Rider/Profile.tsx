// src/pages/Rider/Profile.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
} from '@ionic/react';
import { personOutline, callOutline, mailOutline, saveOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

const RiderProfile: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();

  if (!user || user.role !== 'rider') {
    history.replace('/rider/login');
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [profile, setProfile] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    phone: '+63 912 345 6789',
    vehicle: 'Honda CB500F',
    licensePlate: 'XYZ-1234',
    licenseNumber: '123456789',
    rating: 4.8,
    totalDeliveries: 245,
    bankAccount: '1234567890',
    bankName: 'Philippine National Bank',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any} className="content-with-sticky-footer ion-page-with-bottom-nav">
        {/* Logo Header */}
        <LogoHeader />

        {/* Quick Access Menu */}
        <div className="mobile-container">
          <div className="quick-access-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div 
              onClick={() => history.push('/activities')}
              className="quick-access-item"
              style={{ background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)' }}
            >
              <div className="quick-access-icon">📋</div>
              <span className="quick-access-label">Activity</span>
            </div>
            <div 
              onClick={() => history.push('/messages')}
              className="quick-access-item"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}
            >
              <div className="quick-access-icon">💬</div>
              <span className="quick-access-label">Messages</span>
            </div>
            <div 
              onClick={() => history.push('/report')}
              className="quick-access-item"
              style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)', color: '#1F2937' }}
            >
              <div className="quick-access-icon">⚠️</div>
              <span className="quick-access-label">Report</span>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div style={{ padding: '24px 16px', textAlign: 'center', background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' }}>
          <div className="icon-container" style={{ background: 'rgba(255, 255, 255, 0.3)', margin: '0 auto 16px', border: '3px solid rgba(255, 255, 255, 0.5)' }}>
            <IonIcon icon={personOutline} style={{ fontSize: '32px', color: 'white' }} />
          </div>
          <h2 style={{ margin: '0 0 8px', color: 'white', fontWeight: 700 }}>{profile.name}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px' }}>
              <span style={{ fontSize: '16px', color: '#FCD34D' }}>★</span>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '13px' }}>{profile.rating}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px' }}>
              <span style={{ color: 'white', fontSize: '13px' }}>🚚</span>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '13px' }}>{profile.totalDeliveries} Deliveries</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mobile-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>
              Personal Information
            </h3>
            <IonButton fill="clear" size="small" onClick={() => setIsEditing(!isEditing)} style={{ '--color': '#F59E0B', margin: 0 }}>
              {isEditing ? 'Done' : 'Edit'}
            </IonButton>
          </div>

          <IonCard className="mobile-card">
            <IonCardContent style={{ padding: '16px' }}>
              {isEditing ? (
                <>
                  <IonItem lines="none" style={{ '--background': 'transparent', marginBottom: '12px' } as any}>
                    <IonIcon icon={personOutline} slot="start" style={{ color: '#F59E0B' }} />
                    <IonInput placeholder="Full Name" value={profile.name} onIonChange={(e) => handleInputChange('name', e.detail.value!)} style={{ '--padding-start': '12px' }} />
                  </IonItem>
                  <IonItem lines="none" style={{ '--background': 'transparent', marginBottom: '12px' } as any}>
                    <IonIcon icon={mailOutline} slot="start" style={{ color: '#F59E0B' }} />
                    <IonInput placeholder="Email" value={profile.email} onIonChange={(e) => handleInputChange('email', e.detail.value!)} style={{ '--padding-start': '12px' }} />
                  </IonItem>
                  <IonItem lines="none" style={{ '--background': 'transparent' } as any}>
                    <IonIcon icon={callOutline} slot="start" style={{ color: '#F59E0B' }} />
                    <IonInput placeholder="Phone" value={profile.phone} onIonChange={(e) => handleInputChange('phone', e.detail.value!)} style={{ '--padding-start': '12px' }} />
                  </IonItem>
                </>
              ) : (
                <>
                  <div style={{ margin: '0 0 12px' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Full Name</p>
                    <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.name}</p>
                  </div>
                  <div style={{ margin: '0 0 12px' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Email</p>
                    <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.email}</p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Phone</p>
                    <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.phone}</p>
                  </div>
                </>
              )}
            </IonCardContent>
          </IonCard>
        </div>

        {/* Vehicle Information */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Vehicle Information</h3>
          <IonCard className="mobile-card">
            <IonCardContent style={{ padding: '16px' }}>
              <div style={{ margin: '0 0 12px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Vehicle</p>
                <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.vehicle}</p>
              </div>
              <div style={{ margin: '0 0 12px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>License Plate</p>
                <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.licensePlate}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>License Number</p>
                <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.licenseNumber}</p>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Banking Information */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Banking Information</h3>
          <IonCard className="mobile-card">
            <IonCardContent style={{ padding: '16px' }}>
              <div style={{ margin: '0 0 12px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Bank Name</p>
                <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.bankName}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Account Number</p>
                <p style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 600 }}>{profile.bankAccount}</p>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Notifications */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--ion-text-color)' }}>Preferences</h3>
          <IonCard className="mobile-card">
            <IonItem lines="none" style={{ '--background': 'transparent' } as any}>
              <IonLabel>Enable Notifications</IonLabel>
              <IonToggle checked={notificationsEnabled} onIonChange={(e) => setNotificationsEnabled(e.detail.checked)} slot="end" style={{ '--background-checked': '#F59E0B' }} />
            </IonItem>
          </IonCard>
        </div>

        {/* Action Buttons */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          {isEditing && (
            <IonButton expand="block" className="mobile-button" style={{ '--background': '#F59E0B', margin: '0 0 12px' }}>
              <IonIcon slot="start" icon={saveOutline} />
              Save Changes
            </IonButton>
          )}
          <IonButton expand="block" fill="outline" className="mobile-button" style={{ '--border-color': '#EF4444', '--color': '#EF4444', margin: 0 }} onClick={handleLogout}>
            <IonIcon slot="start" icon={logOutOutline} />
            Logout
          </IonButton>
          </div>

        {/* Bottom Navigation */}
        <BottomNav type="rider" activeTab="profile" />
      </IonContent>
    </IonPage>
  );
};

export default RiderProfile;
