// src/pages/Vendor/VendorReviews.tsx
import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonBadge,
  IonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonTextarea,
} from '@ionic/react';
import {
  starOutline,
  starHalfOutline,
  star,
  chatboxOutline,
  checkmarkOutline,
  closeOutline,
} from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/BottomNav';
import LogoHeader from '../../components/LogoHeader';
import './VendorReviews.css';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  vendorReply?: string;
  replyDate?: string;
}

// Mock data - all hardcoded and static
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Chen',
    rating: 5,
    comment: 'Excellent food quality and very fast delivery! Will definitely order again.',
    date: 'Mar 13, 2026',
    vendorReply:
      'Thank you Sarah! We appreciate your business and look forward to serving you again soon.',
    replyDate: 'Mar 13, 2026',
  },
  {
    id: '2',
    customerName: 'Mike Johnson',
    rating: 4,
    comment: 'Great taste but the pizza was a bit cold by the time it arrived.',
    date: 'Mar 12, 2026',
    vendorReply: 'We apologize for the temperature issue. We will ensure better packaging next time!',
    replyDate: 'Mar 12, 2026',
  },
  {
    id: '3',
    customerName: 'Emma Wilson',
    rating: 5,
    comment: 'Best burger I have had in town. Highly recommend!',
    date: 'Mar 11, 2026',
  },
  {
    id: '4',
    customerName: 'John Smith',
    rating: 3,
    comment: 'Average quality. Expected better for the price.',
    date: 'Mar 10, 2026',
    vendorReply:
      'Thank you for your feedback. We are continuously working to improve our products and service.',
    replyDate: 'Mar 10, 2026',
  },
  {
    id: '5',
    customerName: 'Lisa Anderson',
    rating: 5,
    comment: 'Amazing service and delicious food. Perfect!',
    date: 'Mar 9, 2026',
  },
  {
    id: '6',
    customerName: 'Alex Davis',
    rating: 4,
    comment: 'Good food quality. Order arrived on time.',
    date: 'Mar 8, 2026',
  },
];

interface ReplyForm {
  reply: string;
}

const VendorReviews: React.FC = () => {
  const ionRouter = useIonRouter();
  const { isDarkMode } = useTheme();
  const { isRoleAuthenticated } = useAuth();

  const isVendorAuthenticated = isRoleAuthenticated('vendor');

  if (!isVendorAuthenticated) {
    ionRouter.push('/vendor/login');
    return null;
  }

  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'warning' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });
  const [replyForm, setReplyForm] = useState<ReplyForm>({
    reply: '',
  });

  // Calculate average rating
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IonIcon key={`full-${i}`} icon={star} className="star-icon full" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <IonIcon key="half" icon={starHalfOutline} className="star-icon half" />
      );
    }

    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <IonIcon key={`empty-${i}`} icon={starOutline} className="star-icon empty" />
      );
    }

    return stars;
  };

  const openReplyModal = (reviewId: string) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (review) {
      setReplyForm({ reply: review.vendorReply || '' });
    }
    setReplyingToId(reviewId);
    setShowReplyModal(true);
  };

  const handleSubmitReply = () => {
    if (!replyForm.reply.trim()) {
      showToast('Please enter a reply', 'error');
      return;
    }

    setReviews(
      reviews.map((r) =>
        r.id === replyingToId
          ? {
              ...r,
              vendorReply: replyForm.reply,
              replyDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              }),
            }
          : r
      )
    );

    showToast('Reply submitted successfully!', 'success');
    setShowReplyModal(false);
    setReplyingToId(null);
    setReplyForm({ reply: '' });
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <IonPage>
      <IonContent className="ion-page-with-bottom-nav">
        <LogoHeader />
        <div className="mobile-container">
          <h1 className="section-title">Reviews</h1>
          <p style={{ color: 'var(--ion-text-color-secondary)', marginBottom: '16px' }}>Manage customer feedback and ratings</p>

          {/* Rating Summary Card */}
          <IonCard className="rating-summary-card">
            <IonCardContent>
              <div className="rating-summary-grid">
                <div className="rating-main">
                  <div className="rating-number">{averageRating}</div>
                  <div className="rating-stars">
                    {renderStars(parseFloat(averageRating))}
                  </div>
                  <p className="total-reviews">Based on {reviews.length} reviews</p>
                </div>

                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="rating-bar-item">
                      <div className="bar-label">
                        <span className="bar-stars">
                          {renderStars(rating).slice(0, 1)}
                        </span>
                        <span className="bar-ratings">{rating}★</span>
                      </div>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${(ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="bar-count">{ratingCounts[rating as keyof typeof ratingCounts]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Reviews List */}
          <div className="reviews-list">
            <h2 className="reviews-title">All Reviews</h2>

            {reviews.map((review) => (
              <IonCard key={review.id} className="review-card">
                <IonCardContent>
                  <div className="review-header">
                    <div className="reviewer-info">
                      <p className="reviewer-name">{review.customerName}</p>
                      <div className="review-meta">
                        <div className="stars-row">
                          {renderStars(review.rating)}
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <IonBadge
                      color="success"
                      className={`rating-badge rating-${review.rating}`}
                    >
                      {review.rating}.0★
                    </IonBadge>
                  </div>

                  <p className="review-comment">{review.comment}</p>

                  {review.vendorReply ? (
                    <div className="vendor-reply">
                      <div className="reply-header">
                        <p className="reply-label">Your Reply</p>
                        <span className="reply-date">{review.replyDate}</span>
                      </div>
                      <p className="reply-text">{review.vendorReply}</p>
                      <IonButton
                        size="small"
                        color="primary"
                        fill="clear"
                        onClick={() => openReplyModal(review.id)}
                      >
                        <IonIcon icon={chatboxOutline} slot="start" />
                        Edit Reply
                      </IonButton>
                    </div>
                  ) : (
                    <IonButton
                      expand="block"
                      color="primary"
                      fill="solid"
                      size="small"
                      onClick={() => openReplyModal(review.id)}
                    >
                      <IonIcon icon={chatboxOutline} slot="start" />
                      Reply to Review
                    </IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>

        {/* Reply Modal */}
        <IonModal
          isOpen={showReplyModal}
          onDidDismiss={() => {
            setShowReplyModal(false);
            setReplyingToId(null);
            setReplyForm({ reply: '' });
          }}
          className="reply-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Reply to Review</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyingToId(null);
                    setReplyForm({ reply: '' });
                  }}
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="reply-form">
              {replyingToId && (
                <div className="review-preview">
                  <p className="preview-title">Original Review</p>
                  {reviews
                    .filter((r) => r.id === replyingToId)
                    .map((review) => (
                      <div key={review.id} className="preview-content">
                        <div className="preview-header">
                          <span className="preview-name">{review.customerName}</span>
                          <div className="preview-stars">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="preview-comment">{review.comment}</p>
                      </div>
                    ))}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Your Reply *</label>
                <IonTextarea
                  placeholder="Write a professional and helpful reply..."
                  value={replyForm.reply}
                  onIonChange={(e) =>
                    setReplyForm({ reply: e.detail.value || '' })
                  }
                  rows={5}
                  className="form-textarea"
                />
                <p className="char-count">
                  {replyForm.reply.length}/500 characters
                </p>
              </div>

              <div className="form-info">
                <p className="info-text">
                  💡 Tips for a good reply: Be professional, thank the customer for feedback, address their concerns, and offer solutions if applicable.
                </p>
              </div>

              <div className="form-actions">
                <IonButton
                  expand="block"
                  color="success"
                  fill="solid"
                  onClick={handleSubmitReply}
                >
                  <IonIcon icon={checkmarkOutline} slot="start" />
                  Submit Reply
                </IonButton>
                <IonButton
                  expand="block"
                  color="medium"
                  fill="solid"
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyingToId(null);
                    setReplyForm({ reply: '' });
                  }}
                >
                  Cancel
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        {/* Toast Notification */}
        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={3000}
          color={toast.type === 'success' ? 'success' : toast.type === 'error' ? 'danger' : 'warning'}
          position="top"
        />
      </IonContent>
      <BottomNav type="vendor" activeTab="settings" />
    </IonPage>
  );
};

export default VendorReviews;
