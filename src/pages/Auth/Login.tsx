// src/pages/Auth/Login.tsx
import React, { useState } from 'react';
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
  IonFooter,
} from '@ionic/react';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Login: React.FC = () => {
  const history = useHistory();
  const { login, user } = useAuth();
  const { isDarkMode } = useTheme();

  // Redirect if already logged in
  if (user) {
    history.replace('/user/home');
    return null;
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await login(email, password);
      history.replace('/user/home');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--ion-background-color)', '--border-width': '0' } as any}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/guest/home" color="primary" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any} className="auth-content">
        <div className="auth-container">
          {/* Header */}
          <div className="auth-title-wrapper" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 className="auth-title" style={{ color: '#6366F1' }}>
              Welcome Back
            </h1>
            <p className="auth-subtitle">
              Sign in to continue
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
            <IonItem className="rider-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
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
            <IonItem className="rider-input" style={{ '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
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

          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <IonButton fill="clear" style={{ '--color': '#6366F1', fontSize: '13px', fontWeight: 600, padding: '0', height: 'auto' }}>
              Forgot Password?
            </IonButton>
          </div>

          <IonButton
            expand="block"
            className="mobile-button"
            style={{ '--background': '#6366F1', marginBottom: '20px' }}
            onClick={handleLogin}
          >
            Sign In
          </IonButton>

          {/* Test Credentials */}
          <div className="mobile-card" style={{ marginBottom: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)', margin: '0 0 8px 0', fontWeight: 600 }}>Test Credentials</p>
            <p style={{ fontSize: '12px', color: 'var(--ion-text-color)', margin: '4px 0', fontFamily: 'monospace' }}>📧 user@example.com</p>
            <p style={{ fontSize: '12px', color: 'var(--ion-text-color)', margin: '4px 0', fontFamily: 'monospace' }}>🔑 User@123</p>
          </div>

          {/* Sign Up Link */}
          <div style={{ textAlign: 'center' }}>
            <span className="text-base" style={{ color: 'var(--ion-text-color-secondary)' }}>
              Don't have an account?{' '}
              <span 
                style={{ color: '#6366F1', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => history.push('/register')}
              >
                Sign Up
              </span>
            </span>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Signing in..." />
      </IonContent>

      {/* Footer */}
      <IonFooter style={{ '--background': 'var(--ion-background-color)', '--border-color': 'var(--ion-border-color)', '--border-width': '1px 0 0 0', '--border-style': 'solid' } as any}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Login;