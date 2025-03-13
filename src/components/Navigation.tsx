import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Search, User } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RealAI Estate</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
              <Home className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link to="/search" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
              <Search className="h-5 w-5 mr-1" />
              Search
            </Link>
            <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
              <User className="h-5 w-5 mr-1" />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}