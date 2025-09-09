import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, StarHalf, MessageSquare, Calendar, Loader } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { reviewsAPI } from '@/utils/api';


interface User {
  _id: string;
  name: string;
  avatar?: string;
}

interface College {
  _id: string;
  name: string;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  college: College;
  user: User;
  createdAt: string;
  updatedAt: string;
}

interface ReviewsResponse {
  success: boolean;
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);


  useEffect(() => {
    
      fetchReviews();
    
  }, []);

  const fetchReviews = async () => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const response = await reviewsAPI.getAllReview();
      const data: ReviewsResponse = response.data;
      
      if (data.success) {
        setReviews(prev => page === 1 ? data.data : [...prev, ...data.data]);
        setHasMore(data.pagination.page < data.pagination.pages);
      } else {
        setError('Failed to fetch reviews');
        toast("Failed to load reviews");
      }
    } catch (err: any) {
      setError('Error fetching reviews');
      console.error('Error fetching reviews:', err);
      toast(`"Failed to load reviews"`);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loadingMore) {
      setPage(prev => prev + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key={fullStars} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const ReviewSkeleton = () => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading && page === 1) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        {[...Array(3)].map((_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
        <p className="mt-1 text-sm text-gray-500">Be the first to review this college!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
          <p className="mt-1 text-sm text-gray-500">Be the first to review this college!</p>
        </div>
      ) : (
        <>
          {reviews.map((review) => (
            <Card key={review._id} className="mb-4 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.user.avatar} alt={review.user.name} />
                      <AvatarFallback>
                        {review.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.user.name}</h4>
                        <p>{review.college.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(review.createdAt)}
                        </div>
                     
                      </div>
                      
                      <div className="mt-1">
                        {renderStars(review.rating)}
                      </div>
                      
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button 
                onClick={loadMore} 
                disabled={loadingMore}
                variant="outline"
                className="flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Reviews'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewSection;