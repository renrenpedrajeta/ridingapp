// src/pages/Vendor/VendorLogin.tsx
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonBackButton,
  IonButtons,
  IonLoading,
  IonCheckbox,
  IonFooter,
} from '@ionic/react';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { useTheme } from '../../context/ThemeContext';

const VendorLogin: React.FC = () => {
  const history = useHistory();
  const { vendorLogin, isVendorLoggedIn } = useVendorAuth();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in - using useEffect to avoid render issues
  useEffect(() => {
    if (isVendorLoggedIn) {
      history.replace('/vendor/dashboard');
    }
  }, [isVendorLoggedIn, history]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await vendorLogin(email, password, rememberMe);
      // useEffect will handle the redirect when isVendorLoggedIn updates
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Try demo: vendor@pizza.com / Vendor@123');
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    history.push('/vendor/forgot-password');
  };

  const loadDemoCredentials = async () => {
    setEmail('vendor@pizza.com');
    setPassword('Vendor@123');
    setLoading(true);
    setError('');
    try {
      await vendorLogin('vendor@pizza.com', 'Vendor@123', false);
      // useEffect will handle the redirect when isVendorLoggedIn updates
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
      setLoading(false);
    }
  };

  // If already logged in, show nothing while redirect happens
  if (isVendorLoggedIn) {
    return <IonPage><IonContent></IonContent></IonPage>;
  }

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
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏪</div>
            <h1 className="auth-title" style={{ color: '#8b5cf6' }}>
              Vendor Login
            </h1>
            <p className="auth-subtitle">
              Manage your store and track orders
            </p>
          </div>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="form-group-mobile">
            <label className="form-label">Email</label>
            <IonItem className="vendor-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={mailOutline} slot="start" color="primary" />
              <IonInput
                type="email"
                placeholder="your@email.com"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          {/* Password Input */}
          <div className="form-group-mobile">
            <label className="form-label">Password</label>
            <IonItem className="vendor-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
              <IonInput
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
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

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '8px' }}>
            <IonCheckbox
              checked={rememberMe}
              onIonChange={e => setRememberMe(e.detail.checked)}
              style={{ '--checkbox-background-checked': '#8b5cf6', '--checkmark-color': '#fff' } as any}
            />
            <label style={{ fontSize: '14px', color: 'var(--ion-text-color)', cursor: 'pointer', marginBottom: 0 }}>
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <IonButton
            expand="block"
            className="mobile-button"
            onClick={handleLogin}
            disabled={loading}
            style={{ '--background': '#8b5cf6', '--background-activated': '#7c3aed', '--color': '#fff', marginBottom: '16px' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </IonButton>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <IonButton
              fill="clear"
              onClick={handleForgotPassword}
              style={{ '--color': '#8b5cf6', fontSize: '13px', fontWeight: 600 }}
            >
              Forgot Password?
            </IonButton>
          </div>

          {/* Test Credentials */}
          <div className="mobile-card" style={{ marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)', margin: '0 0 8px 0', fontWeight: 600 }}>Test Credentials</p>
            <p style={{ fontSize: '12px', color: 'var(--ion-text-color)', margin: '4px 0', fontFamily: 'monospace' }}>📧 vendor@pizza.com</p>
            <p style={{ fontSize: '12px', color: 'var(--ion-text-color)', margin: '4px 0', fontFamily: 'monospace' }}>🔑 Vendor@123</p>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', opacity: 0.5 }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--ion-border-color)' }} />
            <div style={{ padding: '0 12px', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>OR</div>
            <div style={{ flex: 1, height: '1px', background: 'var(--ion-border-color)' }} />
          </div>

          {/* Sign Up Link */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <p className="text-base" style={{ color: 'var(--ion-text-color-secondary)', marginBottom: '12px' }}>
              New to vendor platform?
            </p>
            <IonButton
              expand="block"
              fill="outline"
              className="mobile-button"
              onClick={() => history.push('/vendor/register')}
              style={{ '--color': '#8b5cf6', '--border-color': '#8b5cf6' }}
            >
              Create Account
            </IonButton>
          </div>

          {/* Demo Button */}
          <IonButton
            expand="block"
            fill="clear"
            onClick={loadDemoCredentials}
            disabled={loading}
            style={{ '--color': '#8b5cf6', fontSize: '13px', fontWeight: 600 }}
          >
            {loading ? 'Logging in...' : '📧 Use Demo Credentials (vendor@pizza.com)'}
          </IonButton>
        </div>
      </IonContent>

      <IonLoading
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Logging in...'}
      />
    </IonPage>
  );
};

export default VendorLogin;
