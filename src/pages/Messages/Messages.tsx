// src/pages/Messages/Messages.tsx
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
import { useHistory } from 'react-router-dom';
import UserNavBar from '../../components/Navbar/UserNavBar';
import { useAuth } from '../../context/AuthContext';
import './Messages.css';

interface ChatMessage {
  id: string;
  content: string;
  senderRole: 'user' | 'rider' | 'system';
  timestamp: Date;
  status: 'sending' | 'sent' | 'seen' | 'failed';
}

interface Conversation {
  id: string;
  orderId: string;
  otherPerson: {
    id: string;
    name: string;
    role: 'rider';
    image: string;
  };
  stallName: string;
  lastMessage: string;
  unreadCount: number;
  timestamp: Date;
  status: 'active' | 'completed' | 'cancelled';
  orderStatus: 'delivering' | 'delivered';
  canStartDeal: boolean;
}

const Messages: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [completedMessages, setCompletedMessages] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLIonTextareaElement>(null);

  // Mock data
  const conversations: Conversation[] = [
    {
      id: 'conv1',
      orderId: '#1001',
      otherPerson: { id: 'rider1', name: 'Juan Dela Cruz', role: 'rider', image: '👨' },
      stallName: 'Burger King',
      lastMessage: 'I am on my way with your order!',
      unreadCount: 2,
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      status: 'active',
      orderStatus: 'delivering',
      canStartDeal: false,
    },
    {
      id: 'conv2',
      orderId: '#1002',
      otherPerson: { id: 'rider2', name: 'Maria Gonzales', role: 'rider', image: '👩' },
      stallName: 'Sushi Master',
      lastMessage: 'Order has been delivered! Enjoy your meal',
      unreadCount: 0,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
      orderStatus: 'delivered',
      canStartDeal: true,
    },
  ];

  useEffect(() => {
    if (Object.keys(chatMessages).length > 0) return;

    setChatMessages({
      conv1: [
        { id: 'm1', content: 'Hi, I have received your order', senderRole: 'rider', timestamp: new Date(Date.now() - 30 * 60 * 1000), status: 'seen' },
        { id: 'm2', content: 'Great! How long will it take?', senderRole: 'user', timestamp: new Date(Date.now() - 25 * 60 * 1000), status: 'seen' },
        { id: 'm3', content: 'I am on my way with your order!', senderRole: 'rider', timestamp: new Date(Date.now() - 10 * 60 * 1000), status: 'sent' },
      ],
      conv2: [
        { id: 'm1', content: 'Your order is ready!', senderRole: 'rider', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), status: 'seen' },
        { id: 'm2', content: 'Thank you!', senderRole: 'user', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), status: 'seen' },
        { id: 'm3', content: 'Order has been delivered! Enjoy your meal', senderRole: 'rider', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), status: 'seen' },
      ],
    });
  }, []);

  useEffect(() => {
    if (completedMessages.length === 0) return;
    const timer = setTimeout(() => setCompletedMessages([]), 60000);
    return () => clearTimeout(timer);
  }, [completedMessages]);

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
      timestamp: new Date(),
      status: 'sending',
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), userMsg],
    }));

    setNewMessage('');

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

    setTimeout(() => {
      const replies = ['Got it!', 'On my way!', 'Perfect, thanks!', 'Coming right up!'];
      const reply: ChatMessage = {
        id: `reply_${Date.now()}`,
        content: replies[Math.floor(Math.random() * replies.length)],
        senderRole: 'rider',
        timestamp: new Date(),
        status: 'seen',
      };
      setChatMessages(prev => ({
        ...prev,
        [selectedConversation.id]: [...(prev[selectedConversation.id] || []), reply],
      }));
    }, 2400 + Math.random() * 1800);
  };

  const handleCompleteDeal = () => {
    if (!selectedConversation) return;
    setCompletedMessages(prev => [...prev, selectedConversation.id]);

    setTimeout(() => {
      setShowChat(false);
      setCompletedMessages(prev => prev.filter(id => id !== selectedConversation.id));
    }, 60000);
  };

  return (
    <IonPage>
      <UserNavBar title="Messages" />

      <IonContent>
        <div className="messages-header">
          <IonButton fill="clear" onClick={() => history.goBack()}>
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
                    <div className="avatar">{conv.otherPerson.image}</div>

                    <div className="conversation-info">
                      <div className="name-row">
                        <h3>{conv.otherPerson.name}</h3>
                        <div className="badges">
                          <IonBadge color={conv.status}>{conv.status}</IonBadge>
                          {conv.unreadCount > 0 && (
                            <IonBadge color="primary">{conv.unreadCount}</IonBadge>
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
                <span>Order Status:</span>
                <IonBadge
                  color={selectedConversation.orderStatus === 'delivering' ? 'warning' : 'success'}
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
                {msg.senderRole === 'rider' && (
                  <div className="small-avatar">{selectedConversation?.otherPerson.image}</div>
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

        {/* Footer — placed outside IonContent so it stays fixed at bottom */}
        <div className="chat-footer-wrapper">
          <div className="chat-footer">
            {selectedConversation?.canStartDeal &&
              !completedMessages.includes(selectedConversation.id) && (
                <IonButton
                  expand="block"
                  color="success"
                  onClick={handleCompleteDeal}
                  className="complete-deal-btn"
                >
                  <IonIcon icon={checkmarkCircleOutline} slot="start" />
                  Complete Deal
                </IonButton>
              )}

            {completedMessages.includes(selectedConversation?.id ?? '') && (
              <div className="deal-completed-banner">
                <IonIcon icon={checkmarkCircleOutline} />
                <div>
                  <strong>Deal Completed! 🎉</strong>
                  <div>Chat closing in 1 minute...</div>
                </div>
              </div>
            )}

            {!completedMessages.includes(selectedConversation?.id ?? '') && (
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
            )}
          </div>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default Messages;