// src/pages/Vendor/VendorMessages.tsx
/**
 * Vendor Messages Page - Messages with Users, Riders, and other Vendors
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
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import {
  chatbubbleOutline,
  sendOutline,
  checkmarkDoneOutline,
  close,
  arrowBack,
  timeOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import VendorLayout from '../../layouts/VendorLayout';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { useNotification } from '../../context/NotificationContext';

interface ChatMessage {
  id: string;
  content: string;
  senderRole: 'user' | 'rider' | 'vendor';
  senderId: string;
  senderName: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'seen' | 'failed';
}

interface VendorConversation {
  id: string;
  orderId: string;
  otherPerson: {
    id: string;
    name: string;
    role: 'user' | 'rider';
    image: string;
  };
  customerName?: string;
  lastMessage: string;
  unreadCount: number;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
}

const VendorMessages: React.FC = () => {
  const history = useHistory();
  const { vendor } = useVendorAuth();
  const { sendMessage } = useNotification();

  const [filterTab, setFilterTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<VendorConversation | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLIonTextareaElement>(null);

  // Mock vendor conversations
  const allConversations: VendorConversation[] = [
    {
      id: 'conv1',
      orderId: '#1001',
      otherPerson: {
        id: 'user1',
        name: 'John Doe',
        role: 'user',
        image: '👨',
      },
      customerName: 'John Doe',
      lastMessage: 'How long will my order take?',
      unreadCount: 1,
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      status: 'preparing',
    },
    {
      id: 'conv2',
      orderId: '#1001',
      otherPerson: {
        id: 'rider1',
        name: 'Juan Dela Cruz',
        role: 'rider',
        image: '🚴',
      },
      customerName: 'John Doe',
      lastMessage: 'On my way to pick up the order',
      unreadCount: 0,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'ready',
    },
    {
      id: 'conv3',
      orderId: '#1000',
      otherPerson: {
        id: 'user2',
        name: 'Sarah Smith',
        role: 'user',
        image: '👩',
      },
      customerName: 'Sarah Smith',
      lastMessage: 'Thank you for the order!',
      unreadCount: 0,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'delivered',
    },
  ];

  const filteredConversations = allConversations
    .filter(conv => {
      const matchesSearch =
        conv.otherPerson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.orderId.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterTab === 'all') return matchesSearch;
      if (filterTab === 'users') return matchesSearch && conv.otherPerson.role === 'user';
      if (filterTab === 'riders') return matchesSearch && conv.otherPerson.role === 'rider';
      return matchesSearch;
    });

  useEffect(() => {
    if (Object.keys(chatMessages).length > 0) return;

    // Initialize mock chat messages
    setChatMessages({
      conv1: [
        {
          id: 'm1',
          content: 'Your order has been received!',
          senderRole: 'vendor',
          senderId: vendor?.id || '',
          senderName: vendor?.businessName || '',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm2',
          content: 'Thank you! How long will it take?',
          senderRole: 'user',
          senderId: 'user1',
          senderName: 'John Doe',
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm3',
          content: 'About 20 minutes. We are preparing your burger right now.',
          senderRole: 'vendor',
          senderId: vendor?.id || '',
          senderName: vendor?.businessName || '',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          status: 'sent',
        },
      ],
      conv2: [
        {
          id: 'm1',
          content: 'Order is ready for pickup!',
          senderRole: 'vendor',
          senderId: vendor?.id || '',
          senderName: vendor?.businessName || '',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm2',
          content: 'I just arrived! Coming in now.',
          senderRole: 'rider',
          senderId: 'rider1',
          senderName: 'Juan Dela Cruz',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          status: 'seen',
        },
      ],
      conv3: [
        {
          id: 'm1',
          content: 'Your order has been delivered!',
          senderRole: 'vendor',
          senderId: vendor?.id || '',
          senderName: vendor?.businessName || '',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          status: 'seen',
        },
        {
          id: 'm2',
          content: 'Thank you for the order!',
          senderRole: 'user',
          senderId: 'user2',
          senderName: 'Sarah Smith',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'seen',
        },
      ],
    });
  }, [vendor]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'accepted':
      case 'preparing':
        return '#3B82F6';
      case 'ready':
      case 'picked_up':
        return '#10B981';
      case 'delivered':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6366F1';
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageId = `msg_${Date.now()}`;
    const vendorMsg: ChatMessage = {
      id: messageId,
      content: newMessage,
      senderRole: 'vendor',
      senderId: vendor?.id || '',
      senderName: vendor?.businessName || '',
      timestamp: new Date(),
      status: 'sending',
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), vendorMsg],
    }));

    sendMessage({
      senderId: vendor?.id || '',
      senderRole: 'vendor',
      receiverId: selectedConversation.otherPerson.id,
      orderId: selectedConversation.orderId,
      content: newMessage,
      isRead: false,
      messageType: 'text',
    });

    setNewMessage('');

    // Simulate message status
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
  };

  return (
    <VendorLayout pageTitle="Messages">
      <IonPage>
        <IonContent>
          {/* Header */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--ion-border-color)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '24px', fontWeight: 700 }}>Messages</h2>
            <IonSearchbar
              value={searchQuery}
              onIonInput={(e) => setSearchQuery(e.detail.value ?? '')}
              placeholder="Search messages..."
              mode="ios"
              style={{
                '--background': 'var(--ion-card-background)',
                '--border-radius': '12px',
              } as any}
            />
          </div>

          {/* Filter Tabs */}
          <div style={{ padding: '0 16px 16px' }}>
            <IonSegment
              value={filterTab}
              onIonChange={(e) => setFilterTab(e.detail.value as string)}
              scrollable
            >
              <IonSegmentButton value="all">
                <IonLabel>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="users">
                <IonLabel>Customers</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="riders">
                <IonLabel>Riders</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Conversations List */}
          <div style={{ padding: '0 16px' }}>
            {filteredConversations.length === 0 ? (
              <IonCard style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p style={{ margin: 0, color: 'var(--ion-text-color-secondary)' }}>
                  No conversations found
                </p>
              </IonCard>
            ) : (
              filteredConversations.map(conv => (
                <IonCard
                  key={conv.id}
                  style={{
                    margin: '0 0 12px',
                    cursor: 'pointer',
                    background: 'var(--ion-card-background)',
                  }}
                  onClick={() => {
                    setSelectedConversation(conv);
                    setShowChat(true);
                  }}
                >
                  <IonCardContent>
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          backgroundColor: 'linear-gradient(135deg, #6366f1, #818cf8)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          flexShrink: 0,
                        }}
                      >
                        {conv.otherPerson.image}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '4px',
                            gap: '8px',
                          }}
                        >
                          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            {conv.otherPerson.name}
                          </h3>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <IonBadge
                              style={{
                                backgroundColor: getStatusColor(conv.status),
                                fontSize: '10px',
                              }}
                            >
                              {conv.status}
                            </IonBadge>
                            {conv.unreadCount > 0 && (
                              <IonBadge color="danger">{conv.unreadCount}</IonBadge>
                            )}
                          </div>
                        </div>

                        <p style={{ margin: '4px 0', fontSize: '12px', color: 'var(--ion-color-medium)' }}>
                          {conv.orderId} • {conv.otherPerson.role === 'user' ? 'Customer' : 'Rider'}
                        </p>

                        <p
                          style={{
                            margin: '4px 0 0',
                            fontSize: '12px',
                            color: 'var(--ion-text-color)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {conv.lastMessage}
                        </p>
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--ion-color-medium)', textAlign: 'right', flexShrink: 0 }}>
                        {formatTime(conv.timestamp)}
                      </div>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div>{selectedConversation?.otherPerson.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--ion-text-color-secondary)' }}>
                    {selectedConversation?.orderId}
                  </div>
                </div>
              </IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="chat-content" fullscreen>
            <div className="messages-container">
              {(chatMessages[selectedConversation?.id ?? ''] || []).map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '6px',
                    justifyContent: msg.senderRole === 'vendor' ? 'flex-end' : 'flex-start',
                    marginBottom: '10px',
                  }}
                >
                  {msg.senderRole !== 'vendor' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        flexShrink: 0,
                      }}
                    >
                      {selectedConversation?.otherPerson.image}
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '10px 14px',
                      borderRadius: '16px',
                      fontSize: '13px',
                      lineHeight: 1.4,
                      background:
                        msg.senderRole === 'vendor'
                          ? 'var(--ion-color-primary)'
                          : 'var(--ion-card-background)',
                      color: msg.senderRole === 'vendor' ? 'white' : 'var(--ion-text-color)',
                    }}
                  >
                    <p style={{ margin: 0, marginBottom: '4px' }}>{msg.content}</p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        opacity: 0.7,
                        justifyContent:
                          msg.senderRole === 'vendor' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {msg.senderRole === 'vendor' && msg.status === 'sent' && (
                        <IonIcon icon={checkmarkDoneOutline} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </IonContent>

          {/* Footer */}
          <div style={{ borderTop: '1px solid var(--ion-border-color)' }}>
            <div style={{ padding: '12px 12px 8px', background: 'var(--ion-card-background)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <IonTextarea
                  ref={textareaRef}
                  value={newMessage}
                  onIonInput={(e) => setNewMessage(e.detail.value ?? '')}
                  placeholder="Type a message..."
                  autoGrow
                  rows={1}
                  style={{ color: 'var(--ion-text-color)' }}
                />
                <IonButton
                  disabled={!newMessage.trim()}
                  onClick={handleSendMessage}
                  style={{ '--color': '#6366F1' } as any}
                >
                  <IonIcon icon={sendOutline} slot="icon-only" />
                </IonButton>
              </div>
            </div>
          </div>
        </IonModal>
      </IonPage>
    </VendorLayout>
  );
};

export default VendorMessages;
