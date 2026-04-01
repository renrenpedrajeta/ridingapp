// src/pages/Rider/Earnings.tsx
import React, { useState, useMemo } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
} from '@ionic/react';
import { cashOutline, trendingUpOutline, downloadOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import { useAuth } from '../../context/AuthContext';
import '../../styles/mobile-first-responsive.css';

const EARNINGS_DATA = {
  today: { total: 450.50, trips: 12, average: 37.54 },
  week: { total: 2150.75, trips: 58, average: 37.08 },
  month: { total: 8925.30, trips: 245, average: 36.43 },
};

const WEEKLY_EARNINGS = [
  { day: 'Mon', amount: 350, trips: 10 },
  { day: 'Tue', amount: 420, trips: 12 },
  { day: 'Wed', amount: 380, trips: 11 },
  { day: 'Thu', amount: 450, trips: 13 },
  { day: 'Fri', amount: 550, trips: 16 },
  { day: 'Sat', amount: 600, trips: 18 },
  { day: 'Sun', amount: 450, trips: 12 },
];

const RiderEarnings: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  if (!user || user.role !== 'rider') {
    history.replace('/rider/login');
    return null;
  }

  const earnings = EARNINGS_DATA[selectedPeriod as keyof typeof EARNINGS_DATA];
  const maxEarning = useMemo(() => Math.max(...WEEKLY_EARNINGS.map(e => e.amount)), []);

  return (
    <IonPage>
      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any} className="content-with-sticky-footer ion-page-with-bottom-nav">
        {/* Logo Header */}
        <LogoHeader />

        {/* Quick Access Menu */}
        <div className="mobile-container">
          <div className="quick-access-grid">
            <div 
              onClick={() => history.push('/activities')}
              className="quick-access-item"
              style={{ background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)' }}
            >
              <div className="quick-access-icon">📋</div>
              <span className="quick-access-label">Activity</span>
            </div>
            <div 
              onClick={() => history.push('/messages')}
              className="quick-access-item"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}
            >
              <div className="quick-access-icon">💬</div>
              <span className="quick-access-label">Messages</span>
            </div>
          </div>
        </div>

        {/* Period Selection */}
        <div className="mobile-container">
          <IonSegment value={selectedPeriod} onIonChange={e => setSelectedPeriod(e.detail.value as string)} style={{ '--background': 'transparent' } as any}>
            <IonSegmentButton value="today" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px' } as any}>
              <IonLabel style={{ fontSize: '12px' }}>Today</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="week" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px' } as any}>
              <IonLabel style={{ fontSize: '12px' }}>Week</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="month" style={{ '--color-checked': '#FFFFFF', '--border-radius': '8px' } as any}>
              <IonLabel style={{ fontSize: '12px' }}>Month</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Total Earnings Card */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <IonCard style={{ margin: 0, background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' }}>
            <IonCardContent style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <p style={{ margin: '0 0 8px', fontSize: '14px', opacity: 0.9 }}>Total Earnings</p>
                <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 700 }}>₱{earnings.total.toFixed(2)}</h2>
                <p style={{ margin: '12px 0 0', fontSize: '12px', opacity: 0.8 }}>
                  {earnings.trips} trips • Avg: ₱{earnings.average.toFixed(2)}
                </p>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Stats Grid */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <div className="responsive-grid-2">
            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="icon-container-sm" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                    <IonIcon icon={cashOutline} style={{ fontSize: '18px', color: '#F59E0B' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Trips</p>
                    <h4 style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 700 }}>{earnings.trips}</h4>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard style={{ margin: 0, background: 'var(--ion-card-background)' }}>
              <IonCardContent style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="icon-container-sm" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                    <IonIcon icon={trendingUpOutline} style={{ fontSize: '18px', color: '#10B981' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Average</p>
                    <h4 style={{ margin: '4px 0 0', color: 'var(--ion-text-color)', fontWeight: 700 }}>₱{earnings.average.toFixed(2)}</h4>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        {/* Weekly Chart */}
        {selectedPeriod !== 'month' && (
          <div className="mobile-container" style={{ paddingTop: '0' }}>
            <h3 className="section-title" style={{ margin: '16px 0 12px 0' }}>Weekly Breakdown</h3>
            <IonCard className="mobile-card">
              <IonCardContent style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '120px', gap: '6px' }}>
                  {WEEKLY_EARNINGS.map((day, index) => (
                    <div key={index} style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div 
                        style={{
                          height: `${(day.amount / maxEarning) * 100}%`,
                          background: 'linear-gradient(180deg, #F59E0B 0%, #FBBF24 100%)',
                          borderRadius: '6px 6px 0 0',
                          marginBottom: '6px',
                          minHeight: '16px'
                        }}
                      />
                      <p style={{ margin: 0, fontSize: '10px', color: 'var(--ion-text-color-secondary)' }}>{day.day}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '9px', color: 'var(--ion-text-color-secondary)' }}>₱{day.amount}</p>
                    </div>
                  ))}
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mobile-container" style={{ paddingTop: '0' }}>
          <IonButton expand="block" fill="outline" className="mobile-button" style={{ '--border-color': '#F59E0B', '--color': '#F59E0B', margin: 0 }}>
            <IonIcon slot="start" icon={downloadOutline} />
            Download Statement
          </IonButton>
        </div>

        {/* Bottom Navigation */}
        <BottomNav type="rider" activeTab="earnings" />
      </IonContent>
    </IonPage>
  );
};

export default RiderEarnings;
