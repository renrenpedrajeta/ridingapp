import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonMenu,
  IonList,
  IonItem,
  IonMenuButton,
} from '@ionic/react';
import { 
  gridOutline, 
  receiptOutline, 
  bagOutline, 
  barChartOutline, 
  walletOutline, 
  starOutline, 
  chatbubbleOutline, 
  settingsOutline, 
  logOutOutline, 
  menuOutline 
} from 'ionicons/icons';
import { useVendorAuth } from '../../context/VendorAuthContext';

interface VendorLayoutProps {
  children: React.ReactNode;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { vendor, vendorLogout } = useVendorAuth();

  const navItems = [
    { path: '/vendor/dashboard', label: 'Dashboard', icon: gridOutline },
    { path: '/vendor/orders', label: 'Orders', icon: receiptOutline },
    { path: '/vendor/products', label: 'Products', icon: bagOutline },
    { path: '/vendor/inventory', label: 'Inventory', icon: barChartOutline },
    { path: '/vendor/earnings', label: 'Earnings', icon: walletOutline },
    { path: '/vendor/reviews', label: 'Reviews', icon: starOutline },
    { path: '/vendor/messages', label: 'Messages', icon: chatbubbleOutline },
    { path: '/vendor/settings', label: 'Settings', icon: settingsOutline },
  ];

  const handleLogout = () => {
    vendorLogout();
    history.push('/vendor/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <IonPage>
      <IonMenu contentId="vendor-content" side="start" style={{ '--background': 'var(--ion-card-background)' } as any}>
        <IonHeader>
          <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
            <IonTitle style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ion-color-primary)' }}>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList style={{ background: 'var(--ion-card-background)' }}>
            {navItems.map((item) => (
              <IonItem 
                key={item.path}
                onClick={() => history.push(item.path)}
                style={{
                  '--background': isActive(item.path) ? 'var(--ion-color-primary)' : 'transparent',
                  '--color': isActive(item.path) ? '#ffffff' : 'var(--ion-text-color)',
                } as any}
                lines="none"
              >
                <IonIcon icon={item.icon} slot="start" />
                <span>{item.label}</span>
              </IonItem>
            ))}
            <div style={{ height: '1px', background: 'var(--ion-border-color)', margin: '16px 0' }} />
            <IonItem 
              onClick={handleLogout}
              style={{ '--color': 'var(--ion-text-color)' } as any}
              lines="none"
            >
              <IonIcon icon={logOutOutline} slot="start" color="danger" />
              <span>Logout</span>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonHeader style={{ '--background': 'var(--ion-card-background)' } as any}>
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ion-text-color)' }}>
            {vendor?.businessName || 'Vendor Panel'}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} fill="clear" color="primary">
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent id="vendor-content" style={{ '--background': 'var(--ion-background-color)' } as any}>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default VendorLayout;
