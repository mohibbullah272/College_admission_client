// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-bold text-blue-500 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="w-full sm:w-auto">Go to Homepage</Button>
          </Link>
          <Link to="/colleges">
            <Button variant="outline" className="w-full sm:w-auto">Browse Colleges</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;