// src/pages/Rider/PendingApproval.tsx
import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { arrowBack, checkmarkCircleOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import RiderNavBar from '../../components/Navbar/RiderNavBar';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const PendingApproval: React.FC = () => {
  const ionRouter = useIonRouter();
  const { isDarkMode } = useTheme();
  const { getAuthUser } = useAuth();

  const currentRider = getAuthUser('rider');

  // Protect this page - redirect if not a pending rider
  if (!currentRider) {
    ionRouter.push('/rider/login');
    return null;
  }

  return (
    <IonPage>
      <RiderNavBar title="Pending Approval" />

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--ion-color-primary) 0%, rgba(99, 102, 241, 0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px'
          }}>
            <IonIcon 
              icon={checkmarkCircleOutline} 
              style={{ fontSize: '60px', color: 'white' }} 
            />
          </div>

          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--ion-text-color)',
            margin: '0 0 12px 0'
          }}>
            Pending Approval
          </h1>

          <p style={{
            fontSize: '16px',
            color: 'var(--ion-text-color-secondary)',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Thank you for registering! Your account is currently under review by our admin team. We'll verify your documents and details.
          </p>

          <div style={{
            background: 'var(--ion-card-background)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px',
            border: '1px solid var(--ion-border-color)',
            width: '100%',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--ion-text-color)',
              marginBottom: '12px',
              margin: '0 0 12px 0'
            }}>
              What happens next?
            </h3>
            <ul style={{
              margin: 0,
              padding: '0 0 0 20px',
              fontSize: '13px',
              color: 'var(--ion-text-color-secondary)',
              lineHeight: '1.8'
            }}>
              <li>Our admin team will review your registration</li>
              <li>We verify your vehicle and license information</li>
              <li>Your bank details are validated securely</li>
              <li>You'll receive an email once approved</li>
            </ul>
          </div>

          <div style={{
            background: isDarkMode ? 'rgba(217, 119, 6, 0.1)' : '#FEF3C7',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px',
            border: isDarkMode ? '1px solid rgba(217, 119, 6, 0.3)' : '1px solid #FCD34D',
            width: '100%'
          }}>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: isDarkMode ? 'var(--ion-text-color)' : '#92400E',
              fontWeight: 600,
              lineHeight: '1.6'
            }}>
              ℹ️ This usually takes 24-48 hours. Please check your email for updates.
            </p>
          </div>

          <IonButton
            expand="block"
            style={{
              '--background': 'var(--ion-color-primary)',
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px'
            }}
            onClick={() => ionRouter.push('/login')}
          >
            Back to Login
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            style={{
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600
            }}
            color="primary"
            onClick={() => ionRouter.push('/guest/home')}
          >
            Return Home
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PendingApproval;
