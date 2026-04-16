import React from 'react';
import { IonBadge } from '@ionic/react';

interface StatusBadgeProps {
  status: string;
  size?: 'small' | 'medium' | 'large';
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  pending: { color: '#F59E0B', label: 'Pending' },
  preparing: { color: '#3B82F6', label: 'Preparing' },
  ready_for_pickup: { color: '#06B6D4', label: 'Ready' },
  completed: { color: '#10B981', label: 'Completed' },
  cancelled: { color: '#EF4444', label: 'Cancelled' },
  rejected: { color: '#EF4444', label: 'Rejected' },
  online: { color: '#10B981', label: 'Online' },
  busy: { color: '#F59E0B', label: 'On Delivery' },
  offline: { color: '#9CA3AF', label: 'Offline' },
  approved: { color: '#10B981', label: 'Approved' },
  pending_review: { color: '#F59E0B', label: 'Pending Review' },
  open: { color: '#F59E0B', label: 'Open' },
  under_review: { color: '#3B82F6', label: 'Under Review' },
  resolved: { color: '#10B981', label: 'Resolved' },
  closed: { color: '#6B7280', label: 'Closed' },
  active: { color: '#10B981', label: 'Active' },
  inactive: { color: '#EF4444', label: 'Inactive' },
  received: { color: '#F59E0B', label: 'Received' },
  waiting: { color: '#F59E0B', label: 'Waiting' },
  ready: { color: '#06B6D4', label: 'Ready' },
  picked_up: { color: '#3B82F6', label: 'Picked Up' },
  on_way: { color: '#F59E0B', label: 'On the Way' },
  delivered: { color: '#10B981', label: 'Delivered' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'small' }) => {
  const config = STATUS_CONFIG[status] || { color: '#6B7280', label: status };
  
  const sizeStyles = {
    small: { fontSize: '10px', padding: '4px 8px' },
    medium: { fontSize: '12px', padding: '6px 12px' },
    large: { fontSize: '14px', padding: '8px 16px' },
  };

  return (
    <IonBadge
      style={{
        background: config.color + '20',
        color: config.color,
        borderRadius: '8px',
        fontWeight: 600,
        textTransform: 'capitalize',
        ...sizeStyles[size],
      }}
    >
      {config.label}
    </IonBadge>
  );
};

export default StatusBadge;