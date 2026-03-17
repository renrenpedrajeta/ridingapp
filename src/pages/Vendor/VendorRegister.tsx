// src/pages/Vendor/VendorRegister.tsx
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
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, personOutline, storefront, locationOutline, callOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { useTheme } from '../../context/ThemeContext';
import PasswordStrengthIndicator from '../../components/PasswordStrengthIndicator';

const VendorRegister: React.FC = () => {
  const history = useHistory();
  const { vendorRegister, isVendorLoggedIn } = useVendorAuth();
  const { isDarkMode } = useTheme();

  // Redirect if already logged in
  if (isVendorLoggedIn) {
    history.replace('/vendor/dashboard');
    return null;
  }

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    storeAddress: '',
    storeCategory: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const STORE_CATEGORIES = [
    'Italian',
    'Chinese',
    'Mexican',
    'Indian',
    'Japanese',
    'Thai',
    'Mediterranean',
    'American',
    'Bakery',
    'Cafe',
    'Fast Food',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (formData.phone.length < 10) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase letters';
    }
    if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain numbers';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await vendorRegister({
        id: '',
        fullName: formData.fullName,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        storeAddress: formData.storeAddress,
        storeCategory: formData.storeCategory,
      });

      // Auto-login after successful registration
      history.push('/vendor/dashboard');
    } catch (err: any) {
      setErrors({ submit: err.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vendor/login" color="primary" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px', paddingBottom: '140px' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏪</div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#8b5cf6',
              marginBottom: '8px',
              margin: '0 0 12px 0'
            }}>
              Join Us
            </h1>
            <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: 0, fontSize: '15px' }}>
              Create your vendor account
            </p>
          </div>

          {errors.submit && (
            <div style={{
              background: isDarkMode ? '#7f1d1d' : '#fee2e2',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              color: isDarkMode ? '#fecaca' : '#991b1b',
              fontSize: '14px',
              border: `1px solid ${isDarkMode ? '#991b1b' : '#fecaca'}`
            }}>
              {errors.submit}
            </div>
          )}

          {/* Full Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>Full Name</label>
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': `2px solid ${errors.fullName ? '#ef4444' : 'var(--ion-border-color)'}` } as any}>
              <IonIcon icon={personOutline} slot="start" color="primary" />
              <IonInput
                placeholder="John Smith"
                value={formData.fullName}
                onIonChange={e => handleInputChange('fullName', e.detail.value!)}
                style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
            {errors.fullName && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.fullName}</div>}
          </div>

          {/* Business Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>Business Name</label>
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': `2px solid ${errors.businessName ? '#ef4444' : 'var(--ion-border-color)'}` } as any}>
              <IonIcon icon={storefront} slot="start" color="primary" />
              <IonInput
                placeholder="Pizza Palace"
                value={formData.businessName}
                onIonChange={e => handleInputChange('businessName', e.detail.value!)}
                style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
            {errors.businessName && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.businessName}</div>}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>Email</label>
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': `2px solid ${errors.email ? '#ef4444' : 'var(--ion-border-color)'}` } as any}>
              <IonIcon icon={mailOutline} slot="start" color="primary" />
              <IonInput
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onIonChange={e => handleInputChange('email', e.detail.value!)}
                style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
            {errors.email && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</div>}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>Phone Number</label>
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': `2px solid ${errors.phone ? '#ef4444' : 'var(--ion-border-color)'}` } as any}>
              <IonIcon icon={callOutline} slot="start" color="primary" />
              <IonInput
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onIonChange={e => handleInputChange('phone', e.detail.value!)}
                style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
            {errors.phone && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.phone}</div>}
          </div>

          {/* Store Category (Optional) */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>Store Category (Optional)</label>
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonSelect
                placeholder="Select category"
                value={formData.storeCategory}
                onIonChange={e => handleInputChange('storeCategory', e.detail.value)}
                style={{ '--color': 'var(--ion-text-color)' } as any}
              >
                {STORE_CATEGORIES.map(category => (
                  <IonSelectOption key={category} value={category}>{category}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </div>

          {/* Store Address (Optional) */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>Store Address (Optional)</label>
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': '1px solid var(--ion-border-color)' } as any}>
              <IonIcon icon={locationOutline} slot="start" color="primary" />
              <IonInput
                placeholder="123 Main Street, Downtown"
                value={formData.storeAddress}
                onIonChange={e => handleInputChange('storeAddress', e.detail.value!)}
                style={{ '--padding-start': '8px', '--color': 'var(--ion-text-color)' } as any}
              />
            </IonItem>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>Password</label>
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': `2px solid ${errors.password ? '#ef4444' : 'var(--ion-border-color)'}` } as any}>
              <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
              <IonInput
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onIonChange={e => handleInputChange('password', e.detail.value!)}
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
            {errors.password && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.password}</div>}
            <PasswordStrengthIndicator password={formData.password} />
          </div>

          {/* Confirm Password */}
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
            <IonItem style={{ marginBottom: '0', '--background': 'var(--ion-card-background)', '--border': `2px solid ${errors.confirmPassword ? '#ef4444' : 'var(--ion-border-color)'}` } as any}>
              <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
              <IonInput
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onIonChange={e => handleInputChange('confirmPassword', e.detail.value!)}
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
            {errors.confirmPassword && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.confirmPassword}</div>}
          </div>

          {/* Register Button */}
          <IonButton
            expand="block"
            onClick={handleRegister}
            disabled={loading}
            style={{
              '--background': '#8b5cf6',
              '--background-activated': '#7c3aed',
              '--color': '#fff',
              marginBottom: '16px',
              fontWeight: 600
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </IonButton>

          {/* Already have account */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--ion-text-color-secondary)', marginBottom: '12px' }}>
              Already have an account?
            </p>
            <IonButton
              expand="block"
              fill="clear"
              onClick={() => history.push('/vendor/login')}
              style={{
                '--color': '#8b5cf6',
                fontWeight: 600
              }}
            >
              Login Here
            </IonButton>
          </div>
        </div>
      </IonContent>

      <IonLoading
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Creating account...'}
      />
    </IonPage>
  );
};

export default VendorRegister;
