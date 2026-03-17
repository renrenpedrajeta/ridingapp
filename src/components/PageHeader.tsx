import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBadge, IonBackButton, IonPopover, IonLabel, IonItem, IonList } from '@ionic/react';
import { moon, sunny, cartOutline, personOutline, arrowBack, settingsOutline, logOutOutline, home } from 'ionicons/icons';
import { useTheme } from '../context/ThemeContext';

interface PageHeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  showBackButton?: boolean;
  backHref?: string;
  cartCount?: number;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onHomeClick?: () => void;
  customClass?: string;
  isLoggedIn?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title = '',
  showLogo = true,
  showBack = false,
  showBackButton = false,
  backHref = '/guest/home',
  cartCount = 0,
  onCartClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  onLoginClick,
  onHomeClick,
  onRegisterClick,
  customClass = '',
  isLoggedIn = false
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showPopover, setShowPopover] = useState(false);

  return (
    <IonHeader className={`ion-no-border ${customClass}`}>
      <IonToolbar
        style={{
          '--background': 'var(--ion-card-background)',
          '--border-color': 'transparent'
        } as any}
      >
        <IonButtons slot="start">
          {showBack || showBackButton ? (
            <IonBackButton 
              defaultHref={backHref} 
              icon={arrowBack}
              style={{ '--color': '#6366F1' }}
            />
          ) : (
            <IonButton onClick={toggleTheme} style={{ '--color': '#6366F1' }}>
              <IonIcon icon={isDarkMode ? sunny : moon} style={{ fontSize: '24px' }} />
            </IonButton>
          )}
        </IonButtons>

        <IonTitle
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--ion-text-color)'
          }}
        >
          {showLogo ? (
            <>
              <span style={{ color: '#6366F1' }}>Rider</span> App
            </>
          ) : (
            title
          )}
        </IonTitle>

        <IonButtons slot="end">
          {onHomeClick && (
            <IonButton onClick={onHomeClick}>
              <IonIcon icon={home} style={{ fontSize: '24px', color: '#6366F1' }} />
            </IonButton>
          )}
          {onCartClick && (
            <IonButton onClick={onCartClick}>
              <div style={{ position: 'relative' }}>
                <IonIcon icon={cartOutline} style={{ fontSize: '24px', color: '#6366F1' }} />
                {cartCount > 0 && (
                  <IonBadge className="cart-badge">{cartCount}</IonBadge>
                )}
              </div>
            </IonButton>
          )}
          {isLoggedIn && onProfileClick ? (
            <>
              <IonButton onClick={() => setShowPopover(true)}>
                <IonIcon icon={personOutline} style={{ fontSize: '24px', color: 'var(--ion-text-color)' }} />
              </IonButton>
              <IonPopover
                isOpen={showPopover}
                onDidDismiss={() => setShowPopover(false)}
                side="bottom"
                alignment="end"
                style={{ '--width': '200px' }}
              >
                <IonList style={{ padding: '8px 0' }}>
                  <IonItem
                    button
                    onClick={() => {
                      onProfileClick();
                      setShowPopover(false);
                    }}
                    style={{ '--padding-start': '16px', '--padding-end': '16px' }}
                  >
                    <IonIcon icon={personOutline} slot="start" style={{ color: '#6366F1', marginRight: '12px' }} />
                    <IonLabel>Profile</IonLabel>
                  </IonItem>
                  {onSettingsClick && (
                    <IonItem
                      button
                      onClick={() => {
                        onSettingsClick();
                        setShowPopover(false);
                      }}
                      style={{ '--padding-start': '16px', '--padding-end': '16px' }}
                    >
                      <IonIcon icon={settingsOutline} slot="start" style={{ color: '#6366F1', marginRight: '12px' }} />
                      <IonLabel>Settings</IonLabel>
                    </IonItem>
                  )}
                  {onLogoutClick && (
                    <IonItem
                      button
                      onClick={() => {
                        onLogoutClick();
                        setShowPopover(false);
                      }}
                      style={{ '--padding-start': '16px', '--padding-end': '16px', '--color': '#EF4444' }}
                    >
                      <IonIcon icon={logOutOutline} slot="start" style={{ color: '#EF4444', marginRight: '12px' }} />
                      <IonLabel style={{ color: '#EF4444' }}>Logout</IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </IonPopover>
            </>
          ) : isLoggedIn ? null : onLoginClick || onRegisterClick ? (
            <>
              {onLoginClick && (
                <IonButton onClick={onLoginClick} style={{ '--color': '#6366F1' }}>
                  <IonLabel>Login</IonLabel>
                </IonButton>
              )}
              {onRegisterClick && (
                <IonButton onClick={onRegisterClick} fill="solid" style={{ '--background': '#6366F1', borderRadius: '8px', marginLeft: '8px' }}>
                  <IonLabel>Register</IonLabel>
                </IonButton>
              )}
            </>
          ) : null}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
