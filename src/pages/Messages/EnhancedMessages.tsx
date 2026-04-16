// src/pages/Messages/EnhancedMessages.tsx
/**
 * Enhanced Messages Page - Supports User-to-Vendor, User-to-Rider, Vendor-to-Rider messaging
 * Integrates with NotificationService and OrderTrackingService
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonButton,
  IonTextarea,
  IonSpinner,
  IonModal,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonTitle,
} from '@ionic/react';
import {
  chatbubbleOutline,
  sendOutline,
  checkmarkDoneOutline,
  checkmarkCircleOutline,
  arrowBack,
  close,
} from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import UserNavBar from '../../components/Navbar/UserNavBar';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { notificationService } from '../../services/NotificationService';
import './Messages.css';

interface ChatMessage {
  id: string;
  content: string;
  senderRole: 'user' | 'rider' | 'vendor' | 'system';
  senderId: string;
  senderName: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'seen' | 'failed';
}

interface Conversation {
  id: string;
  orderId: string;
  otherPerson: {
    id: string;
    name: string;
    role: 'rider' | 'vendor';
    image: string;
  };
  stallName: string;
  lastMessage: string;
  unreadCount: number;
  timestamp: Date;
  status: 'active' | 'completed' | 'cancelled';
  orderStatus: string;
  canStartDeal: boolean;
}

const EnhancedMessages: React.FC = () => {
  const ionRouter = useIonRouter();
  const { user, logout } = useAuth();
  const { sendMessage, getMessages } = useNotification();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLIonTextareaElement>(null);

  // Mock conversations data - In production, fetch from backend
  const conversations: Conversation[] = [
    {
      id: 'conv1',
      orderId: '#1001',
      otherPerson: {
        id: 'vendor1',
        name: 'Burger King',
        role: 'vendor',
        image: '🍔',
      },
      stallName: 'Burger King',
      lastMessage: 'We received your order! Preparing it now.',
      unreadCount: 1,
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      status: 'active',
      orderStatus: 'preparing',
      canStartDeal: false,
    },
    {
      id: 'conv2',
      orderId: '#1001',
      otherPerson: {
        id: 'rider1',
        name: 'Juan Dela Cruz',
        role: 'rider',
        image: '👨',
      },
      stallName: 'Burger King',
      lastMessage: 'I am on my way with your order!',
      unreadCount: 0,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'active',
      orderStatus: 'delivering',
      canStartDeal: false,
    },
    {
      id: 'conv3',
      orderId: '#1000',
      otherPerson: {
        id: 'rider2',
        name: 'Maria Gonzales',
        role: 'rider',
        image: '👩',
      },
      stallName: 'Sushi Master',
      lastMessage: 'Order has been delivered! Enjoy your meal',
      unreadCount: 0,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      orderStatus: 'delivered',
      canStartDeal: true,
    },
  ];

  useEffect(() => {
    if (Object.keys(chatMessages).length > 0) return;

    // Initialize mock chat messages
    setChatMessages({
      conv1: [
        {
          id: 'm1',
          content: 'Your order has been received!',
          senderRole: 'vendor',
          senderId: 'vendor1',
          senderName: 'Burger King',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm2',
          content: 'Thank you! How long will it take?',
          senderRole: 'user',
          senderId: user?.id || '',
          senderName: user?.name || '',
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm3',
          content: 'About 25 minutes. We are preparing it now.',
          senderRole: 'vendor',
          senderId: 'vendor1',
          senderName: 'Burger King',
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm4',
          content: 'Perfect! Thank you.',
          senderRole: 'user',
          senderId: user?.id || '',
          senderName: user?.name || '',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          status: 'seen',
        },
      ],
      conv2: [
        {
          id: 'm1',
          content: 'Hi! I have picked up your order from Burger King',
          senderRole: 'rider',
          senderId: 'rider1',
          senderName: 'Juan Dela Cruz',
          timestamp: new Date(Date.now() - 12 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm2',
          content: 'Great! How long will it take?',
          senderRole: 'user',
          senderId: user?.id || '',
          senderName: user?.name || '',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm3',
          content: 'I am on my way with your order! About 8 minutes.',
          senderRole: 'rider',
          senderId: 'rider1',
          senderName: 'Juan Dela Cruz',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          status: 'sent',
        },
      ],
      conv3: [
        {
          id: 'm1',
          content: 'Your order is ready!',
          senderRole: 'rider',
          senderId: 'rider2',
          senderName: 'Maria Gonzales',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm2',
          content: 'Thank you!',
          senderRole: 'user',
          senderId: user?.id || '',
          senderName: user?.name || '',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm3',
          content: 'Order has been delivered! Enjoy your meal',
          senderRole: 'rider',
          senderId: 'rider2',
          senderName: 'Maria Gonzales',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'seen',
        },
      ],
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, selectedConversation]);

  useEffect(() => {
    const textarea = textareaRef.current?.querySelector('textarea');
    if (!textarea) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);
    return () => textarea.removeEventListener('keydown', handleKeyDown);
  }, [newMessage, selectedConversation]);

  const filteredConversations = conversations.filter(conv =>
    conv.otherPerson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageId = `msg_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: messageId,
      content: newMessage,
      senderRole: 'user',
      senderId: user?.id || '',
      senderName: user?.name || '',
      timestamp: new Date(),
      status: 'sending',
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), userMsg],
    }));

    // Send via notification service
    sendMessage({
      senderId: user?.id || '',
      senderRole: 'user',
      receiverId: selectedConversation.otherPerson.id,
      orderId: selectedConversation.orderId,
      content: newMessage,
      isRead: false,
      messageType: 'text',
    });

    setNewMessage('');

    // Simulate message status updates
    setTimeout(() => {
      setChatMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(m =>
          m.id === messageId ? { ...m, status: 'sent' } : m
        ),
      }));
    }, 600);

    setTimeout(() => {
      setChatMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(m =>
          m.id === messageId ? { ...m, status: 'seen' } : m
        ),
      }));
    }, 1800);

    // Simulate reply from other person
    setTimeout(() => {
      const replies = {
        vendor: [
          'Got it!',
          'Your order is being prepared!',
          'Will be ready soon!',
          'Thank you for your order!',
        ],
        rider: [
          'Got it!',
          'On my way!',
          'Almost there!',
          'Thank you for your order!',
        ],
      };

      const replyList =
        replies[selectedConversation.otherPerson.role as 'vendor' | 'rider'];
      const reply: ChatMessage = {
        id: `reply_${Date.now()}`,
        content: replyList[Math.floor(Math.random() * replyList.length)],
        senderRole: selectedConversation.otherPerson.role,
        senderId: selectedConversation.otherPerson.id,
        senderName: selectedConversation.otherPerson.name,
        timestamp: new Date(),
        status: 'seen',
      };
      setChatMessages(prev => ({
        ...prev,
        [selectedConversation.id]: [...(prev[selectedConversation.id] || []), reply],
      }));
    }, 2400 + Math.random() * 1800);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'vendor':
        return '#10B981';
      case 'rider':
        return '#6366F1';
      default:
        return '#9CA3AF';
    }
  };

  return (
    <IonPage>
      <UserNavBar title="Messages" />

      <IonContent>
        <div className="messages-header">
          <IonButton fill="clear" onClick={() => ionRouter.goBack()}>
            <IonIcon icon={arrowBack} />
          </IonButton>
          <h2>Messages</h2>
          <div style={{ width: 44 }} />
        </div>

        <div className="search-container">
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? '')}
            placeholder="Search conversations..."
            mode="ios"
          />
        </div>

        <div className="conversations-list">
          {filteredConversations.length === 0 ? (
            <IonCard className="empty-card">
              <p>No conversations found</p>
            </IonCard>
          ) : (
            filteredConversations.map(conv => (
              <IonCard
                key={conv.id}
                className="conversation-card"
                onClick={() => {
                  setSelectedConversation(conv);
                  setShowChat(true);
                }}
              >
                <IonCardContent>
                  <div className="conversation-row">
                    <div
                      className="avatar"
                      style={{
                        background:
                          conv.otherPerson.role === 'vendor'
                            ? 'linear-gradient(135deg, #10B981, #34D399)'
                            : 'linear-gradient(135deg, #6366f1, #818cf8)',
                      }}
                    >
                      {conv.otherPerson.image}
                    </div>

                    <div className="conversation-info">
                      <div className="name-row">
                        <h3>{conv.otherPerson.name}</h3>
                        <div className="badges">
                          <IonBadge
                            color={conv.otherPerson.role === 'vendor' ? 'success' : 'primary'}
                            style={{ fontSize: '10px', fontWeight: 600 }}
                          >
                            {conv.otherPerson.role === 'vendor' ? 'Vendor' : 'Rider'}
                          </IonBadge>
                          {conv.unreadCount > 0 && (
                            <IonBadge color="danger">{conv.unreadCount}</IonBadge>
                          )}
                        </div>
                      </div>

                      <p className="subtitle">
                        {conv.stallName} • {conv.orderId}
                      </p>

                      <p className="last-message">{conv.lastMessage}</p>
                    </div>

                    <div className="timestamp">{formatTime(conv.timestamp)}</div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      </IonContent>

      {/* Chat Modal */}
      <IonModal isOpen={showChat} onDidDismiss={() => setShowChat(false)}>
        <IonHeader translucent>
          <IonToolbar>
            <IonButton slot="start" fill="clear" onClick={() => setShowChat(false)}>
              <IonIcon icon={close} slot="icon-only" />
            </IonButton>
            <IonTitle>
              <div className="chat-header-title">
                <div>{selectedConversation?.otherPerson.name}</div>
                <div className="chat-subtitle">
                  {selectedConversation?.stallName} • {selectedConversation?.orderId}
                </div>
              </div>
            </IonTitle>
          </IonToolbar>

          {selectedConversation && (
            <IonToolbar className="order-status-bar">
              <div className="status-row">
                <span>
                  {selectedConversation.otherPerson.role === 'vendor'
                    ? 'Vendor Status:'
                    : 'Delivery Status:'}
                </span>
                <IonBadge
                  style={{
                    background: getRoleColor(selectedConversation.otherPerson.role),
                  }}
                >
                  {selectedConversation.orderStatus}
                </IonBadge>
              </div>
            </IonToolbar>
          )}
        </IonHeader>

        <IonContent className="chat-content" fullscreen>
          <div className="messages-container">
            {(chatMessages[selectedConversation?.id ?? ''] || []).map(msg => (
              <div
                key={msg.id}
                className={`message-row ${msg.senderRole === 'user' ? 'sent' : 'received'}`}
              >
                {msg.senderRole !== 'user' && (
                  <div
                    className="small-avatar"
                    style={{
                      background:
                        msg.senderRole === 'vendor'
                          ? 'linear-gradient(135deg, #10B981, #34D399)'
                          : 'linear-gradient(135deg, #6366f1, #818cf8)',
                    }}
                  >
                    {selectedConversation?.otherPerson.image}
                  </div>
                )}

                <div className="message-bubble">
                  <p>{msg.content}</p>
                  <div className="message-meta">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {msg.senderRole === 'user' && (
                      <>
                        {msg.status === 'sending' && <IonSpinner name="dots" />}
                        {msg.status === 'sent' && <IonIcon icon={checkmarkDoneOutline} />}
                        {msg.status === 'seen' && (
                          <IonIcon icon={checkmarkDoneOutline} color="primary" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </IonContent>

        {/* Footer */}
        <div className="chat-footer-wrapper">
          <div className="chat-footer">
            {selectedConversation?.canStartDeal && (
              <IonButton
                expand="block"
                color="success"
                className="complete-deal-btn"
              >
                <IonIcon icon={checkmarkCircleOutline} slot="start" />
                Rate & Close
              </IonButton>
            )}

            <div className="input-row">
              <IonTextarea
                ref={textareaRef}
                value={newMessage}
                onIonInput={(e) => setNewMessage(e.detail.value ?? '')}
                placeholder="Type a message... (Enter to send)"
                autoGrow
                rows={1}
                className="message-input"
              />
              <IonButton
                disabled={!newMessage.trim()}
                onClick={handleSendMessage}
                className="send-btn"
              >
                <IonIcon icon={sendOutline} slot="icon-only" />
              </IonButton>
            </div>
          </div>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default EnhancedMessages;
