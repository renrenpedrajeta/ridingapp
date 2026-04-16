// src/pages/Vendor/VendorSettings.tsx
import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonTextarea,
  IonToggle,
  IonToast,
} from '@ionic/react';
import {
  saveOutline,
  closeOutline,
  checkmarkOutline,
  imageOutline,
  phonePortraitOutline,
  locationOutline,
  timeOutline,
  mailOutline,
  logOutOutline,
} from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import './VendorSettings.css';

interface StoreSettings {
  storeName: string;
  storeDescription: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  city: string;
  postalCode: string;
  monOpen: string;
  monClose: string;
  tueOpen: string;
  tueClose: string;
  wedOpen: string;
  wedClose: string;
  thuOpen: string;
  thuClose: string;
  friOpen: string;
  friClose: string;
  satOpen: string;
  satClose: string;
  sunOpen: string;
  sunClose: string;
  monClosed: boolean;
  tueClosed: boolean;
  wedClosed: boolean;
  thuClosed: boolean;
  friClosed: boolean;
  satClosed: boolean;
  sunClosed: boolean;
}

// Mock data - all hardcoded and static
const MOCK_STORE_SETTINGS: StoreSettings = {
  storeName: 'Pizza Palace',
  storeDescription: 'Authentic Italian pizzas and delicious pasta dishes. Fresh ingredients, wood-fired oven, and excellent service.',
  contactPhone: '+1 (555) 123-4567',
  contactEmail: 'vendor@pizza.com',
  address: '123 Main Street',
  city: 'New York',
  postalCode: '10001',
  monOpen: '10:00',
  monClose: '23:00',
  tueOpen: '10:00',
  tueClose: '23:00',
  wedOpen: '10:00',
  wedClose: '23:00',
  thuOpen: '10:00',
  thuClose: '23:00',
  friOpen: '10:00',
  friClose: '00:00',
  satOpen: '11:00',
  satClose: '00:00',
  sunOpen: '11:00',
  sunClose: '22:00',
  monClosed: false,
  tueClosed: false,
  wedClosed: false,
  thuClosed: false,
  friClosed: false,
  satClosed: false,
  sunClosed: false,
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const VendorSettings: React.FC = () => {
  const ionRouter = useIonRouter();
  const { isDarkMode } = useTheme();
  const { isRoleAuthenticated, logout } = useAuth();

  const isVendorAuthenticated = isRoleAuthenticated('vendor');

  if (!isVendorAuthenticated) {
    ionRouter.push('/vendor/login');
    return null;
  }

  const handleLogout = () => {
    logout('vendor');
    ionRouter.push('/vendor/login');
  };

  const [settings, setSettings] = useState<StoreSettings>(MOCK_STORE_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'warning' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleToggleDayOff = (dayKey: string) => {
    const closedField = `${dayKey}Closed` as keyof StoreSettings;
    setSettings((prev) => ({
      ...prev,
      [closedField]: !prev[closedField],
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    if (!settings.storeName.trim()) {
      showToast('Store name is required', 'error');
      return;
    }

    if (!settings.contactEmail.trim()) {
      showToast('Contact email is required', 'error');
      return;
    }

    showToast('Settings saved successfully!', 'success');
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setSettings(MOCK_STORE_SETTINGS);
    setHasChanges(false);
    showToast('Settings reset to default', 'warning');
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <IonPage>
      <IonContent className="ion-page-with-bottom-nav">
        <LogoHeader />
        
        <div className="mobile-container">
          <h1 className="section-title">Settings</h1>
          <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: '16px' }}>Manage your store</p>

          <IonCard className="settings-card">
            <IonCardContent>
              <h2 className="section-title">
                <IonIcon icon={imageOutline} />
                Store Information
              </h2>

              <div className="form-group">
                <label className="form-label">Store Name *</label>
                <IonInput
                  placeholder="Enter store name"
                  value={settings.storeName}
                  onIonChange={(e) => handleInputChange('storeName', e.detail.value || '')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Store Description</label>
                <IonTextarea
                  placeholder="Describe your store, menu, and specialties..."
                  value={settings.storeDescription}
                  onIonChange={(e) => handleInputChange('storeDescription', e.detail.value || '')}
                  rows={4}
                  className="form-textarea"
                />
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="settings-card">
            <IonCardContent>
              <h2 className="section-title">
                <IonIcon icon={phonePortraitOutline} />
                Contact Information
              </h2>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <IonInput
                  placeholder="Enter phone number"
                  value={settings.contactPhone}
                  onIonChange={(e) => handleInputChange('contactPhone', e.detail.value || '')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <IonInput
                  type="email"
                  placeholder="Enter email address"
                  value={settings.contactEmail}
                  onIonChange={(e) => handleInputChange('contactEmail', e.detail.value || '')}
                  className="form-input"
                />
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="settings-card">
            <IonCardContent>
              <h2 className="section-title">
                <IonIcon icon={locationOutline} />
                Location
              </h2>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <IonInput
                  placeholder="Enter street address"
                  value={settings.address}
                  onIonChange={(e) => handleInputChange('address', e.detail.value || '')}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <IonInput
                    placeholder="Enter city"
                    value={settings.city}
                    onIonChange={(e) => handleInputChange('city', e.detail.value || '')}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <IonInput
                    placeholder="Enter postal code"
                    value={settings.postalCode}
                    onIonChange={(e) => handleInputChange('postalCode', e.detail.value || '')}
                    className="form-input"
                  />
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="settings-card">
            <IonCardContent>
              <h2 className="section-title">
                <IonIcon icon={timeOutline} />
                Opening Hours
              </h2>

              <div className="hours-grid">
                {DAYS.map((day, index) => {
                  const dayKey = DAY_KEYS[index];
                  const closedField = `${dayKey}Closed` as keyof StoreSettings;
                  const openField = `${dayKey}Open` as keyof StoreSettings;
                  const closeField = `${dayKey}Close` as keyof StoreSettings;
                  const isClosed = settings[closedField] as boolean;
                  const openValue = settings[openField] as string;
                  const closeValue = settings[closeField] as string;

                  return (
                    <div key={day} className="hours-item">
                      <div className="hours-day-header">
                        <h3 className="hours-day">{day}</h3>
                        <div className="closed-toggle">
                          <span className="closed-label">Closed</span>
                          <IonToggle
                            checked={isClosed}
                            onIonChange={() => handleToggleDayOff(dayKey)}
                          />
                        </div>
                      </div>

                      {!isClosed && (
                        <div className="hours-inputs">
                          <div className="time-input-group">
                            <label>Opening</label>
                            <IonInput
                              type="time"
                              value={openValue}
                              onIonChange={(e) =>
                                handleInputChange(openField, e.detail.value || '')
                              }
                              className="time-input"
                            />
                          </div>
                          <div className="time-separator">→</div>
                          <div className="time-input-group">
                            <label>Closing</label>
                            <IonInput
                              type="time"
                              value={closeValue}
                              onIonChange={(e) =>
                                handleInputChange(closeField, e.detail.value || '')
                              }
                              className="time-input"
                            />
                          </div>
                        </div>
                      )}

                      {isClosed && (
                        <div className="closed-badge">CLOSED</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </IonCardContent>
          </IonCard>

          <div className="settings-actions">
            <IonButton
              expand="block"
              color="primary"
              fill="solid"
              onClick={handleSaveSettings}
              disabled={!hasChanges}
            >
              <IonIcon icon={saveOutline} slot="start" />
              Save Changes
            </IonButton>

            {hasChanges && (
              <IonButton
                expand="block"
                color="medium"
                fill="outline"
                onClick={handleResetSettings}
              >
                <IonIcon icon={closeOutline} slot="start" />
                Discard Changes
              </IonButton>
            )}
          </div>

          <IonButton 
            expand="block" 
            color="danger"
            onClick={handleLogout}
            style={{ '--border-radius': '12px', marginTop: '16px' } as any}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Logout
          </IonButton>

          <div style={{ height: '40px' }} />
        </div>

        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={3000}
          color={toast.type === 'success' ? 'success' : toast.type === 'error' ? 'danger' : 'warning'}
          position="top"
        />
      </IonContent>
      <BottomNav type="vendor" activeTab="settings" />
    </IonPage>
  );
};

export default VendorSettings;
