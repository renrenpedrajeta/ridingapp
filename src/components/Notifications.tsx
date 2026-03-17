import React, { useState } from 'react';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  notificationsOutline,
  close,
  checkmarkDoneOutline,
  timeOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { useNotification } from '../context/NotificationContext';
import './Notifications.css';

const Notifications: React.FC = () => {
  const { notifications, unreadCount, markAsRead } = useNotification();
  const [showModal, setShowModal] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_placed':
      case 'order_accepted':
      case 'order_ready':
      case 'rider_accepted':
      case 'order_delivered':
        return checkmarkCircleOutline;
      case 'order_rejected':
      case 'order_cancelled':
        return alertCircleOutline;
      case 'order_preparing':
      case 'rider_on_way':
        return timeOutline;
      default:
        return informationCircleOutline;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order_placed':
      case 'order_accepted':
        return '#6366F1';
      case 'order_preparing':
      case 'rider_on_way':
        return '#F59E0B';
      case 'order_ready':
      case 'rider_accepted':
      case 'order_delivered':
        return '#10B981';
      case 'order_rejected':
      case 'order_cancelled':
        return '#EF4444';
      default:
        return '#6366F1';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div className="notification-bell">
        <IonButton
          onClick={() => setShowModal(true)}
          fill="clear"
          className="bell-button"
        >
          <IonIcon icon={notificationsOutline} />
          {unreadCount > 0 && (
            <IonBadge className="notification-badge" color="danger">
              {unreadCount > 99 ? '99+' : unreadCount}
            </IonBadge>
          )}
        </IonButton>
      </div>

      {/* Notifications Modal */}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Notifications</IonTitle>
            <IonButton
              slot="end"
              fill="clear"
              onClick={() => setShowModal(false)}
            >
              <IonIcon icon={close} slot="icon-only" />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <IonIcon icon={notificationsOutline} />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map(notification => (
                <IonCard
                  key={notification.id}
                  className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <IonCardContent>
                    <div className="notification-row">
                      <div
                        className="notification-icon"
                        style={{
                          background: getNotificationColor(notification.type),
                        }}
                      >
                        <IonIcon icon={getNotificationIcon(notification.type)} />
                      </div>

                      <div className="notification-content">
                        <div className="notification-header">
                          <h3>{notification.title}</h3>
                          {!notification.isRead && (
                            <div className="unread-indicator" />
                          )}
                        </div>

                        <p className="notification-message">{notification.message}</p>

                        <div className="notification-meta">
                          <IonIcon icon={timeOutline} />
                          <span>{formatTime(notification.createdAt)}</span>
                        </div>

                        {notification.data?.orderId && (
                          <div className="notification-order-id">
                            Order: {notification.data.orderId}
                          </div>
                        )}
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default Notifications;
