// src/pages/MyCollege.tsx
import React, { useState, useEffect } from 'react';
import { admissionsAPI, reviewsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProtectedRoute from '../components/ProtectedRoute';

interface Admission {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  address: string;
  dateOfBirth: string;
  subject: string;
  image: string;
  college: {
    _id: string;
    name: string;
    image: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const MyCollege: React.FC = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
 

  useEffect(() => {
    fetchMyAdmissions();
  }, []);

  const fetchMyAdmissions = async () => {
    setLoading(true);
    try {
      const response = await admissionsAPI.getMyAdmissions();
      setAdmissions(response.data);
      if (response.data.length > 0) {
        setSelectedAdmission(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmission) return;

    setSubmittingReview(true);
    try {
      await reviewsAPI.create({
        rating: review.rating,
        comment: review.comment,
        college: selectedAdmission.college._id,
      });
      setReview({ rating: 5, comment: '' });
      alert('Review submitted successfully!');
    } catch (error: any) {
      console.error('Failed to submit review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My College Applications</h1>
        
        {admissions.length === 0 ? (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No Applications Found</h2>
              <p className="text-gray-600 mb-4">You haven't applied to any colleges yet.</p>
              <Button onClick={() => window.location.href = '/admission'}>
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Applications</CardTitle>
                  <CardDescription>
                    Click on an application to view details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {admissions.map((admission) => (
                      <div
                        key={admission._id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedAdmission?._id === admission._id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedAdmission(admission)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{admission.college.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(admission.status)}`}>
                            {admission.status.charAt(0).toUpperCase() + admission.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Applied: {new Date(admission.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Subject: {admission.subject}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedAdmission ? (
                <>
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Application Details</CardTitle>
                      <CardDescription>
                        Information about your application to {selectedAdmission.college.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center mb-4">
                            <img
                              src={selectedAdmission.college.image || 'https://via.placeholder.com/100x100'}
                              alt={selectedAdmission.college.name}
                              className="w-16 h-16 rounded-lg object-cover mr-4"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">{selectedAdmission.college.name}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedAdmission.status)}`}>
                                {selectedAdmission.status.charAt(0).toUpperCase() + selectedAdmission.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-500">Application Date</p>
                              <p>{new Date(selectedAdmission.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Subject</p>
                              <p>{selectedAdmission.subject}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Personal Information</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-500">Full Name</p>
                              <p>{selectedAdmission.candidateName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p>{selectedAdmission.candidateEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p>{selectedAdmission.candidatePhone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Date of Birth</p>
                              <p>{new Date(selectedAdmission.dateOfBirth).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Address</p>
                              <p>{selectedAdmission.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedAdmission.status === 'approved' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Add a Review</CardTitle>
                        <CardDescription>
                          Share your experience with {selectedAdmission.college.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="rating">Rating</Label>
                            <Select
                              value={review.rating.toString()}
                              onValueChange={(value) => setReview({ ...review, rating: parseInt(value) })}
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
                              value={review.comment}
                              onChange={(e) => setReview({ ...review, comment: e.target.value })}
                              rows={4}
                              placeholder="Share your experience with this college..."
                            />
                          </div>
                          <Button type="submit" disabled={submittingReview}>
                            {submittingReview ? 'Submitting...' : 'Submit Review'}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-600">Select an application to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MyCollege;