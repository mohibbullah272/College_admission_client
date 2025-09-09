// src/pages/Admission.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { collegesAPI, admissionsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProtectedRoute from '../components/ProtectedRoute';

interface College {
  _id: string;
  name: string;
}

const Admission: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedCollegeId = searchParams.get('college');
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    address: '',
    dateOfBirth: '',
    subject: '',
    image: '',
    college: preSelectedCollegeId || '',
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
    if (user) {
      setFormData((prev) => ({
        ...prev,
        candidateName: user.name || '',
        candidateEmail: user.email || '',
      }));
    }
  }, [user]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const response = await collegesAPI.getAll({ limit: 100 });
      setColleges(response.data.data);
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCollegeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, college: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await admissionsAPI.create(formData);
      navigate('/my-college');
    } catch (error: any) {
      console.error('Failed to submit admission:', error);
      alert(error.response?.data?.message || 'Failed to submit admission application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">College Admission</h1>
        
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Admission Application</CardTitle>
            <CardDescription>
              Fill out the form below to apply for college admission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="candidateName">Full Name</Label>
                  <Input
                    id="candidateName"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="candidateEmail">Email</Label>
                  <Input
                    id="candidateEmail"
                    name="candidateEmail"
                    type="email"
                    value={formData.candidateEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="candidatePhone">Phone Number</Label>
                  <Input
                    id="candidatePhone"
                    name="candidatePhone"
                    value={formData.candidatePhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="college">College</Label>
                  {loading ? (
                    <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                  ) : (
                    <Select value={formData.college} onValueChange={handleCollegeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((college) => (
                          <SelectItem key={college._id} value={college._id}>
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Admission;