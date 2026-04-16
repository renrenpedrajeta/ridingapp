// src/pages/Vendor/VendorForgotPassword.tsx
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
  IonBackButton,
  IonButtons,
  IonLoading,
} from '@ionic/react';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

type ForgotPasswordStep = 'email' | 'verify' | 'reset' | 'success';

const VendorForgotPassword: React.FC = () => {
  const ionRouter = useIonRouter();
  const { resetPassword } = useAuth();
  const { isDarkMode } = useTheme();

  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailSubmit = async () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await resetPassword(email);
      setStep('verify');
      setSuccessMessage('If this email exists, you will receive a verification code');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    // Simulate code verification
    if (verificationCode === '123456') {
      setStep('reset');
      setError('');
    } else {
      setError('Invalid verification code');
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reset password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    ionRouter.push('/vendor/login');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            {step === 'success' ? null : <IonBackButton defaultHref="/vendor/login" color="primary" />}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px', paddingBottom: '140px' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#8b5cf6',
              marginBottom: '8px',
              margin: '0 0 12px 0'
            }}>
              Reset Password
            </h1>
            {step === 'email' && (
              <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: 0, fontSize: '15px' }}>
                Enter your email to reset your password
              </p>
            )}
            {step === 'verify' && (
              <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: 0, fontSize: '15px' }}>
                Enter the verification code sent to {email}
              </p>
            )}
            {step === 'reset' && (
              <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: 0, fontSize: '15px' }}>
                Create a new password
              </p>
            )}
            {step === 'success' && (
              <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: 0, fontSize: '15px' }}>
                Password reset successfully!
              </p>
            )}
          </div>

          {/* Error Messages */}
          {error && (
            <div style={{
              background: isDarkMode ? '#7f1d1d' : '#fee2e2',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              color: isDarkMode ? '#fecaca' : '#991b1b',
              fontSize: '14px',
              border: `1px solid ${isDarkMode ? '#991b1b' : '#fecaca'}`
            }}>
              {error}
            </div>
          )}

          {/* Success Messages */}
          {successMessage && (
            <div style={{
              background: isDarkMode ? '#064e3b' : '#d1fae5',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              color: isDarkMode ? '#a7f3d0' : '#065f46',
              fontSize: '14px',
              border: `1px solid ${isDarkMode ? '#065f46' : '#a7f3d0'}`
            }}>
              {successMessage}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ion-text-color)',
                  textTransform: 'uppercase',
                  opacity: 0.7
                }}>Email Address</label>
                <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
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

              <IonButton
                expand="block"
                onClick={handleEmailSubmit}
                disabled={loading}
                style={{
                  '--background': '#8b5cf6',
                  '--background-activated': '#7c3aed',
                  '--color': '#fff',
                  fontWeight: 600
                }}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </IonButton>
            </>
          )}

          {/* Step 2: Verify Code */}
          {step === 'verify' && (
            <>
              <div style={{
                background: isDarkMode ? '#374151' : '#f3f4f6',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '13px',
                color: 'var(--ion-text-color-secondary)',
                lineHeight: '1.6'
              }}>
                <p style={{ marginBottom: '8px', marginTop: 0 }}>📧 Demo verification code:</p>
                <p style={{ marginBottom: 0, fontWeight: 700, color: '#8b5cf6', fontSize: '16px', fontFamily: 'monospace' }}>123456</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ion-text-color)',
                  textTransform: 'uppercase',
                  opacity: 0.7
                }}>Verification Code</label>
                <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                  <IonInput
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onIonChange={e => setVerificationCode(e.detail.value!)}
                    style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)', textAlign: 'center', fontSize: '18px', fontFamily: 'monospace' } as any}
                  />
                </IonItem>
              </div>

              <IonButton
                expand="block"
                onClick={handleVerifyCode}
                disabled={loading}
                style={{
                  '--background': '#8b5cf6',
                  '--background-activated': '#7c3aed',
                  '--color': '#fff',
                  marginBottom: '16px',
                  fontWeight: 600
                }}
              >
                Verify Code
              </IonButton>

              <IonButton
                expand="block"
                fill="outline"
                onClick={() => {
                  setStep('email');
                  setVerificationCode('');
                  setError('');
                }}
                style={{
                  '--color': '#8b5cf6',
                  '--border-color': '#8b5cf6',
                }}
              >
                Back to Email
              </IonButton>
            </>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ion-text-color)',
                  textTransform: 'uppercase',
                  opacity: 0.7
                }}>New Password</label>
                <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                  <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
                  <IonInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={newPassword}
                    onIonChange={e => setNewPassword(e.detail.value!)}
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

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ion-text-color)',
                  textTransform: 'uppercase',
                  opacity: 0.7
                }}>Confirm Password</label>
                <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
                  <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
                  <IonInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onIonChange={e => setConfirmPassword(e.detail.value!)}
                    style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
                  />
                  <IonButton
                    fill="clear"
                    slot="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <IonIcon icon={showConfirmPassword ? eyeOffOutline : eyeOutline} color="primary" />
                  </IonButton>
                </IonItem>
              </div>

              <IonButton
                expand="block"
                onClick={handleResetPassword}
                disabled={loading}
                style={{
                  '--background': '#8b5cf6',
                  '--background-activated': '#7c3aed',
                  '--color': '#fff',
                  fontWeight: 600
                }}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </IonButton>
            </>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <>
              <div style={{
                background: isDarkMode ? '#064e3b' : '#d1fae5',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center',
                marginBottom: '40px'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: isDarkMode ? '#a7f3d0' : '#065f46',
                  marginBottom: '8px'
                }}>
                  Password Reset Successful!
                </p>
                <p style={{
                  fontSize: '14px',
                  color: isDarkMode ? '#6ee7b7' : '#047857',
                  marginBottom: 0
                }}>
                  You can now login with your new password
                </p>
              </div>

              <IonButton
                expand="block"
                onClick={handleBackToLogin}
                style={{
                  '--background': '#8b5cf6',
                  '--background-activated': '#7c3aed',
                  '--color': '#fff',
                  fontWeight: 600
                }}
              >
                Back to Login
              </IonButton>
            </>
          )}

          <IonLoading
            isOpen={loading}
            onDidDismiss={() => setLoading(false)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VendorForgotPassword;
