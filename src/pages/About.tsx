import React from 'react';
import LocationMap from '../components/LocationMap';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="relative text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/about_us_image02.jpg')`,
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 drop-shadow-lg animate-fadeIn">
            About Us
          </h1>
          <p className="text-xl text-center text-gray-100 drop-shadow-md animate-slideUp animate-delay-200">
            Learn more about Wynnum Mini Supermarket
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-slideUp">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-600 text-lg">
            <p>
              Wynnum Mini Supermarket has been serving the local community for over 15 years. 
              What started as a small family-owned store has grown into a beloved neighborhood destination 
              for fresh products and friendly service.
            </p>
            <p>
              We take pride in being more than just a supermarket. We're a part of the community, 
              supporting local suppliers and creating a welcoming environment where neighbors can 
              meet, shop, and connect.
            </p>
            <p>
              Our commitment to quality, affordability, and exceptional customer service has made us 
              the preferred choice for families in the Wynnum area.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fadeIn">
          Our Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Value 1 */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-zoomIn animate-delay-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
            <p className="text-gray-600">
              We never compromise on the quality of our products
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-zoomIn animate-delay-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Community</h3>
            <p className="text-gray-600">
              Supporting and serving our local community
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-zoomIn animate-delay-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Integrity</h3>
            <p className="text-gray-600">
              Honest and transparent in all we do
            </p>
          </div>

          {/* Value 4 */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-zoomIn animate-delay-400">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Excellence</h3>
            <p className="text-gray-600">
              Striving for excellence in service delivery
            </p>
          </div>
        </div>
      </div>


      {/* Location Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-slideUp">
        <LocationMap />
      </div>
    </div>
  );
};

export default About;

