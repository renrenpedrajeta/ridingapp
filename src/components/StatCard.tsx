import React from 'react';
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
  gradient?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
  trend, 
  color = '#6366F1',
  gradient 
}) => {
  const bgGradient = gradient || `linear-gradient(135deg, ${color} 0%, ${color}88 100%)`;

  return (
    <IonCard className="stat-card" style={{ margin: 0 }}>
      <IonCardContent style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ 
              margin: 0, 
              fontSize: '12px', 
              color: 'var(--ion-text-color-secondary)',
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              {label}
            </p>
            <p style={{ 
              margin: '8px 0 0', 
              fontSize: '28px', 
              fontWeight: 700, 
              color: 'var(--ion-text-color)' 
            }}>
              {value}
            </p>
            {trend && (
              <p style={{ 
                margin: '4px 0 0', 
                fontSize: '12px', 
                color: 'var(--ion-text-color-secondary)' 
              }}>
                {trend}
              </p>
            )}
          </div>
          <div 
            className="stat-icon"
            style={{ 
              background: bgGradient,
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            {icon}
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default StatCard;