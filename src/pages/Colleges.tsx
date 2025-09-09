// src/pages/Colleges.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { collegesAPI } from '../utils/api';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

export interface College {
  _id: string;
  name: string;
  image: string;
  rating: number;
  admissionDate: string;
  researchCount: number;
  events: string[];
  sports: string[];
}
export const renderStars = (rating: number) => {
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

const Colleges: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
    const {user}=useAuth()
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchColleges();
  }, [page]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const response = await collegesAPI.getAll({ page, limit: 6, });
      setColleges(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Colleges</h1>
      


      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {colleges.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No colleges found. Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <Card key={college._id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                    loading='lazy'
                      src={college.image || 'https://via.placeholder.com/400x300'}
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{college.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <span className="mr-2">Rating:</span>
                      <div className="flex">
                        {renderStars(Math.floor(college.rating))}
                      </div>
                      <span className="ml-2">({college.rating})</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Admission Date:</span>{' '}
                      {new Date(college.admissionDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Research Count:</span>{' '}
                      {college.researchCount}
                    </p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Events:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {college.events.slice(0, 3).map((event, index) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {event}
                          </span>
                        ))}
                        {college.events.length > 3 && (
                          <span className="text-xs">+{college.events.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                {
                    user &&     <Link to={`/colleges/${college._id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                }
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Colleges;