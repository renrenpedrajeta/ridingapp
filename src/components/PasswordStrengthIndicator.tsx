// src/components/PasswordStrengthIndicator.tsx
import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const calculateStrength = (pwd: string): { strength: number; label: string; color: string } => {
    let strength = 0;

    if (pwd.length >= 8) strength += 1;
    if (pwd.length >= 12) strength += 1;
    if (/[a-z]/.test(pwd)) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 1;

    if (strength <= 2) return { strength: 1, label: 'Weak', color: '#ef4444' };
    if (strength <= 4) return { strength: 2, label: 'Fair', color: '#f97316' };
    if (strength <= 5) return { strength: 3, label: 'Good', color: '#eab308' };
    return { strength: 4, label: 'Strong', color: '#22c55e' };
  };

  if (!password) return <div style={{ marginBottom: '12px' }} />;

  const { strength, label, color } = calculateStrength(password);

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ion-text-color-secondary)' }}>
          Password Strength:
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color }}>
          {label}
        </div>
      </div>
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        height: '4px',
        borderRadius: '2px',
        overflow: 'hidden',
        background: 'var(--ion-text-color-secondary)',
        opacity: 0.2
      }}>
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            style={{
              flex: 1,
              background: i <= strength ? color : 'transparent',
              borderRadius: '2px',
              transition: 'background 0.3s ease'
            }}
          />
        ))}
      </div>
      <div style={{ 
        fontSize: '11px', 
        color: 'var(--ion-text-color-secondary)', 
        marginTop: '6px',
        lineHeight: '1.4'
      }}>
        {password.length < 8 && '• At least 8 characters'}
        {password.length >= 8 && !(/[A-Z]/.test(password)) && '• Add uppercase letters'}
        {password.length >= 8 && /[A-Z]/.test(password) && !(/[0-9]/.test(password)) && '• Add numbers'}
        {password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && '✓ Strong password'}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
