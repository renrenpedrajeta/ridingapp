// src/pages/Auth/Register.tsx
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
import { personOutline, mailOutline, lockClosedOutline, callOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Register: React.FC = () => {
  const ionRouter = useIonRouter();
  const { register, user } = useAuth();
  const { isDarkMode } = useTheme();

  // Redirect if already logged in
  if (user) {
    ionRouter.push('/user/home');
    return null;
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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
        phone: formData.phone
      });
      ionRouter.push('/user/home');
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
        <div className="auth-container">
          {/* Header */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="auth-title" style={{ color: '#6366F1' }}>
              Create Account
            </h1>
            <p className="auth-subtitle">
              Join our community of food lovers
            </p>
          </div>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <div className="form-group-mobile">
            <label className="form-label">Full Name</label>
            <IonItem className="rider-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={personOutline} slot="start" color="primary" />
              <IonInput
                placeholder="Your full name"
                value={formData.name}
                onIonChange={e => setFormData({...formData, name: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div className="form-group-mobile">
            <label className="form-label">Email</label>
            <IonItem className="rider-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
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

          <div className="form-group-mobile">
            <label className="form-label">Phone</label>
            <IonItem className="rider-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={callOutline} slot="start" color="primary" />
              <IonInput
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onIonChange={e => setFormData({...formData, phone: e.detail.value!})}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          <div className="form-group-mobile">
            <label className="form-label">Password</label>
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

          <div className="form-group-mobile">
            <label className="form-label">Confirm Password</label>
            <IonItem className="rider-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
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

          <IonItem lines="none" style={{ '--background': 'transparent', marginBottom: '20px' } as any}>
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
            className="mobile-button"
            style={{ '--background': '#6366F1', marginBottom: '20px' }}
            onClick={handleRegister}
          >
            Create Account
          </IonButton>

          <div style={{ textAlign: 'center' }}>
            <span className="text-base" style={{ color: 'var(--ion-text-color-secondary)' }}>
              Already have an account?{' '}
              <span 
                style={{ color: '#6366F1', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => ionRouter.push('/login')}
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

export default Register;