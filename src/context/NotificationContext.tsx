import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, Message } from '../types';
import { notificationService } from '../services/NotificationService';
import { orderTrackingService } from '../services/OrderTrackingService';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  messages: Message[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  sendMessage: (message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) => void;
  markAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
  getMessages: (userId1: string, userId2: string) => Message[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // Initialize with current user
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUserId(user.id);
      
      // Load existing notifications and messages
      const existingNotifications = notificationService.getNotifications(user.id);
      setNotifications(existingNotifications);
    }
  }, []);

  // Subscribe to notification updates
  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribe = notificationService.subscribe(
      `notification_${currentUserId}`,
      (notification: Notification) => {
        setNotifications(prev => [notification, ...prev]);
      }
    );

    return unsubscribe;
  }, [currentUserId]);

  // Subscribe to message updates
  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribe = notificationService.subscribe(
      `message_${currentUserId}`,
      (message: Message) => {
        setMessages(prev => [...prev, message]);
      }
    );

    return unsubscribe;
  }, [currentUserId]);

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotif = notificationService.createNotification(notification);
    setNotifications(prev => [newNotif, ...prev]);
  };

  const sendMessage = (message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMessage = notificationService.sendMessage(message);
    setMessages(prev => [...prev, newMessage]);
  };

  const markAsRead = (notificationId: string) => {
    notificationService.markAsRead(notificationId);
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    if (currentUserId) {
      notificationService.clearNotifications(currentUserId);
      setNotifications([]);
    }
  };

  const getMessages = (userId1: string, userId2: string): Message[] => {
    return notificationService.getMessages(userId1, userId2);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        messages,
        addNotification,
        sendMessage,
        markAsRead,
        clearNotifications,
        getMessages,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
