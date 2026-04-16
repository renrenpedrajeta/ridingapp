// src/pages/Auth/RiderRegister.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonIcon,
  IonText,
  IonBackButton,
  IonButtons,
  IonLoading,
  IonCheckbox,
  IonLabel,
  IonFooter,
} from '@ionic/react';
import { personOutline, mailOutline, lockClosedOutline, callOutline, eyeOutline, eyeOffOutline, carOutline, documentOutline, businessOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const RiderRegister: React.FC = () => {
  const ionRouter = useIonRouter();
  const { register, user } = useAuth();
  const { isDarkMode } = useTheme();

  // Redirect if already logged in
  if (user) {
    ionRouter.push(user.role === 'rider' ? '/rider/home' : '/user/home');
    return null;
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicle: '',
    licensePlate: '',
    licenseNumber: '',
    bankAccount: '',
    bankName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (!formData.vehicle || !formData.licensePlate || !formData.licenseNumber) {
      setError('Please fill in all vehicle and license information');
      return;
    }
    if (!formData.bankAccount || !formData.bankName) {
      setError('Please fill in all bank information');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreed) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        vehicle: formData.vehicle,
        licensePlate: formData.licensePlate,
        licenseNumber: formData.licenseNumber,
        bankAccount: formData.bankAccount,
        bankName: formData.bankName,
        role: 'rider'
      });
      // Show pending verification message
      ionRouter.push('/rider/pending-approval');
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/guest/home" color="primary" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px', paddingBottom: '140px' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚴</div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 800, 
              color: '#6366F1',
              marginBottom: '8px',
              margin: '0 0 12px 0'
            }}>
              Join as Rider
            </h1>
            <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: 0, fontSize: '15px' }}>
              Start your delivery journey
            </p>
          </div>

          {error && (
            <div style={{ 
              background: '#fee2e2', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '24px',
              color: '#991b1b',
              fontSize: '14px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Full Name</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={personOutline} slot="start" color="primary" />
              <IonInput
                placeholder="Your full name"
                value={formData.name}
                onIonChange={e => setFormData({...formData, name: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Email</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={mailOutline} slot="start" color="primary" />
              <IonInput
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onIonChange={e => setFormData({...formData, email: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Phone</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={callOutline} slot="start" color="primary" />
              <IonInput
                type="tel"
                placeholder="+63 912 345 6789"
                value={formData.phone}
                onIonChange={e => setFormData({...formData, phone: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Vehicle</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={carOutline} slot="start" color="primary" />
              <IonInput
                placeholder="e.g., Honda CB500F"
                value={formData.vehicle}
                onIonChange={e => setFormData({...formData, vehicle: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>License Plate</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={documentOutline} slot="start" color="primary" />
              <IonInput
                placeholder="e.g., ABC-1234"
                value={formData.licensePlate}
                onIonChange={e => setFormData({...formData, licensePlate: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>License Number</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={documentOutline} slot="start" color="primary" />
              <IonInput
                placeholder="Your license number"
                value={formData.licenseNumber}
                onIonChange={e => setFormData({...formData, licenseNumber: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Bank Name</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={businessOutline} slot="start" color="primary" />
              <IonInput
                placeholder="e.g., Philippine National Bank"
                value={formData.bankName}
                onIonChange={e => setFormData({...formData, bankName: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Bank Account Number</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={businessOutline} slot="start" color="primary" />
              <IonInput
                placeholder="Your account number"
                value={formData.bankAccount}
                onIonChange={e => setFormData({...formData, bankAccount: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Password</label>
            <IonItem className="rider-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
              <IonInput
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onIonChange={e => setFormData({...formData, password: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
              <IonButton 
                fill="clear" 
                slot="end"
                onClick={() => setShowPassword(!showPassword)}
              >
                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} color="primary" />
              </IonButton>
            </IonItem>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ion-text-color)', textTransform: 'uppercase', opacity: 0.7 }}>Confirm Password</label>
            <IonItem className="rider-input" style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
              <IonInput
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onIonChange={e => setFormData({...formData, confirmPassword: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <IonItem lines="none" style={{ '--background': 'transparent', marginBottom: '24px' } as any}>
            <IonCheckbox 
              slot="start"
              checked={agreed}
              onIonChange={e => setAgreed(e.detail.checked)}
              style={{ '--checkbox-background-checked': '#6366F1', '--border-color-checked': '#6366F1' } as any}
            />
            <IonLabel style={{ fontSize: '13px', color: 'var(--ion-text-color-secondary)' }}>
              I agree to the <span style={{ color: '#6366F1', fontWeight: 700 }}>Terms of Service</span> and{' '}
              <span style={{ color: '#6366F1', fontWeight: 700 }}>Privacy Policy</span>
            </IonLabel>
          </IonItem>

          <IonButton
            expand="block"
            size="large"
            className="rider-button"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '24px'
            }}
            onClick={handleRegister}
          >
            Create Account
          </IonButton>

          <div style={{ textAlign: 'center' }}>
            <span style={{ color: 'var(--ion-text-color-secondary)', fontSize: '14px' }}>
              Already have an account?{' '}
              <span 
                style={{ color: '#6366F1', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => ionRouter.push('/rider/login')}
              >
                Sign In
              </span>
            </span>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Creating account..." />
      </IonContent>

      {/* Footer */}
      <IonFooter style={{ '--background': 'var(--ion-card-background)', borderTop: '1px solid var(--ion-border-color)', padding: '16px' } as any}>
        <p style={{ textAlign: 'center', margin: '0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </IonFooter>
    </IonPage>
  );
};

export default RiderRegister;
