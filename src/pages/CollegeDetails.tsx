// src/components/CollegeDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { collegesAPI, reviewsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface College {
  _id: string;
  name: string;
  image: string;
  rating: number;
  admissionDate: string;
  researchCount: number;
  events: string[];
  sports: string[];
  researchHistory: string[];
  gallery: string[];
  admissionProcess: string;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const CollegeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      fetchCollege();
      fetchReviews();
    }
  }, [id]);

  const fetchCollege = async () => {
    setLoading(true);
    try {
      const response = await collegesAPI.getById(id!);
      setCollege(response.data.data);
    } catch (error) {
      console.error('Failed to fetch college:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewsAPI.getByCollege(id!);
      setReviews(response.data.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please sign in to leave a review');
      return;
    }

    setReviewLoading(true);
    try {
      await reviewsAPI.create({
        rating: newReview.rating,
        comment: newReview.comment,
        college: id!,
      });
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(); // Refresh reviews
    } catch (error:any) {
      console.error('Failed to submit review:', error);
      toast.error(error?.response?.data?.message)

    } finally {
      setReviewLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">College not found</h1>
          <Link to="/colleges">
            <Button>Back to Colleges</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  console.log(college)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/colleges" className="text-blue-600 hover:underline">
          ← Back to Colleges
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={college.image || 'https://via.placeholder.com/800x400'}
              alt={college.name}
              loading='lazy'
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">{college.name}</h1>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="mr-2">Rating:</span>
              <div className="flex">
                {renderStars(Math.floor(college.rating))}
              </div>
              <span className="ml-2">({college.rating})</span>
            </div>
            <p className="text-gray-600">
              <span className="font-medium">Admission Date:</span>{' '}
              {new Date(college.admissionDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Research Count:</span> {college.researchCount}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Admission Process</h2>
            <p className="text-gray-700">{college.admissionProcess}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Events</h2>
            <div className="flex flex-wrap gap-2">
              {college?.events?.map((event, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {event}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Sports</h2>
            <div className="flex flex-wrap gap-2">
              {college?.sports?.map((sport, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {sport}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Research History</h2>
            <ul className="list-disc pl-5 space-y-1">
              {college?.researchHistory?.map((research, index) => (
                <li key={index} className="text-gray-700">
                  {research}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {college?.gallery?.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    src={image || 'https://via.placeholder.com/300x200'}
                    alt={`${college.name} gallery ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Apply for Admission</CardTitle>
              <CardDescription>
                Submit your application for admission to this college
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={`/admission?college=${college._id}`}>
                <Button className="w-full">Apply Now</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                See what others are saying about this college
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? (
                <p className="text-gray-500 mb-4">No reviews yet. Be the first to review!</p>
              ) : (
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto pr-2">
                  {reviews?.map((review:Review) => (
                    <div key={review._id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{review.user.name}</h4>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {isAuthenticated ? (
                <form onSubmit={handleReviewSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <Select
                        value={newReview.rating.toString()}
                        onValueChange={(value) => setNewReview({ ...newReview, rating: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="comment">Your Review</Label>
                      <Textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        rows={3}
                        placeholder="Share your experience with this college..."
                      />
                    </div>
                    <Button type="submit" disabled={reviewLoading} className="w-full">
                      {reviewLoading ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-2">Please sign in to leave a review</p>
                  <Link to="/signin">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;