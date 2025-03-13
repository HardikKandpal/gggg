import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Bed, Bath, Square } from 'lucide-react';
// import { getProperties, Property } from '../lib/supabase';

type Property = {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  year_built: number;
  description: string;
  features: string[];
  images: { url: string }[];
  address: string;
  city: string;
  state: string;
  zip_code: string;
};

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const [properties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // const filters = Object.fromEntries(searchParams.entries());
    // getProperties(filters)
    //   .then(setProperties)
    //   .finally(() => setLoading(false));
    setLoading(false); // Set loading to false directly for now
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/property/${property.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={property.images[0]?.url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'}
                alt={property.title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {property.title}
              </h2>
              
              <p className="text-blue-600 text-lg font-semibold mb-4">
                ${property.price.toLocaleString()}
              </p>
              
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-1" />
                  <span>{property.square_feet.toLocaleString()}</span>
                </div>
              </div>
              
              <p className="mt-2 text-gray-600 text-sm">
                {property.city}, {property.state}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}