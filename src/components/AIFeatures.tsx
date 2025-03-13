import React, { useState } from 'react';
import { Building2, Search, Brain, ImagePlus } from 'lucide-react';
import { 
  generatePropertyDescription, 
  analyzePropertyImage, 
  estimatePropertyValue,
  processNaturalLanguageSearch 
} from '../lib/openai';

export function AIFeatures() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleNaturalLanguageSearch = async () => {
    setLoading(true);
    try {
      const searchParams = await processNaturalLanguageSearch(searchQuery);
      setResults({ type: 'search', data: searchParams });
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  const handleImageAnalysis = async () => {
    if (!imageUrl) return;
    setLoading(true);
    try {
      const analysis = await analyzePropertyImage(imageUrl);
      setResults({ type: 'analysis', data: analysis });
    } catch (error) {
      console.error('Image analysis error:', error);
    }
    setLoading(false);
  };

  const handleValuation = async () => {
    setLoading(true);
    try {
      const value = await estimatePropertyValue({
        location: '123 Main St, Example City',
        type: 'Single Family Home',
        size: 2000,
        bedrooms: 3,
        bathrooms: 2,
        yearBuilt: 2000,
        features: ['Garage', 'Garden']
      });
      setResults({ type: 'valuation', data: value });
    } catch (error) {
      console.error('Valuation error:', error);
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          AI-Powered Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Natural Language Search */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Search className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Smart Property Search</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe your ideal property..."
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleNaturalLanguageSearch}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {loading ? 'Processing...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Image Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <ImagePlus className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Image Analysis</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL..."
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleImageAnalysis}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </div>

          {/* Property Valuation */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Building2 className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Property Valuation</h3>
            </div>
            <button
              onClick={handleValuation}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? 'Calculating...' : 'Get Estimate'}
            </button>
          </div>

          {/* Results Display */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">AI Results</h3>
            </div>
            <div className="prose">
              {results && (
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
                  {JSON.stringify(results.data, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}