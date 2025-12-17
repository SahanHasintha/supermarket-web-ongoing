import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full Screen Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-emerald-900/50"></div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gray-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-12">
        
        {/* Main Card with enhanced styling */}
        <div 
          className="relative rounded-[40px] p-5 sm:p-8 md:p-10 max-w-3xl w-full animate-zoomIn overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(240, 240, 240, 0.65) 50%, rgba(255, 255, 255, 0.7) 100%)',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 150px rgba(100, 100, 100, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Decorative corner elements with glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-400/10 via-gray-300/5 to-transparent rounded-br-full blur-sm"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-400/10 via-gray-300/5 to-transparent rounded-tl-full blur-sm"></div>
          
          {/* Top edge highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
          
          {/* Side accent lines */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gray-300/20 to-transparent"></div>
          <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gray-300/20 to-transparent"></div>
          
          {/* Logo Container with enhanced styling */}
          <div className="relative flex justify-center mb-7 z-10">
            <div className="relative group">
              {/* Multi-layer glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-3xl blur-2xl opacity-15 group-hover:opacity-25 transition-all duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-tr from-gray-300 to-gray-400 rounded-3xl blur-lg opacity-10 group-hover:opacity-20 transition-all duration-500"></div>
              
              {/* Logo box with advanced styling */}
              <div 
                className="relative bg-white rounded-3xl p-4 sm:p-5 md:p-6 transform transition-all duration-300 group-hover:scale-105"
                style={{
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 60px rgba(100, 100, 100, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)',
                  border: '2px solid rgba(150, 150, 150, 0.2)',
                }}
              >
                <img 
                  src="/Market logo.png" 
                  alt="Wynnum Mini Supermarket Logo" 
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain relative z-10"
                />
              </div>
            </div>
          </div>

          {/* Welcome Text with enhanced typography */}
          <div className="text-center mb-6 relative" style={{ fontFamily: "'Roboto', sans-serif" }}>
            <h1 
              className="leading-tight"
              style={{ 
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 tracking-tight" 
                style={{ 
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                  fontWeight: 700
                }}>
                Welcome!
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-1 tracking-wide">
                Wynnum
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 tracking-wide">
                Mini Supermarket
              </span>
            </h1>
          </div>

          {/* Navigation Buttons - Enhanced Design */}
          <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center mt-6 z-10">
            
            {/* Home Button */}
            <button
              onClick={() => navigate('/home')}
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 sm:gap-3 justify-center border-2 border-emerald-400/50 w-full sm:w-56"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative bg-white/25 rounded-full p-1.5 sm:p-2 group-hover:bg-white/35 transition-colors duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold">Home</span>
            </button>

            {/* About Button */}
            <button
              onClick={() => navigate('/about')}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 sm:gap-3 justify-center border-2 border-blue-400/50 w-full sm:w-56"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative bg-white/25 rounded-full p-1.5 sm:p-2 group-hover:bg-white/35 transition-colors duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold">About</span>
            </button>

            {/* Services Button */}
            <button
              onClick={() => navigate('/services')}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 sm:gap-3 justify-center border-2 border-purple-400/50 w-full sm:w-56"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative bg-white/25 rounded-full p-1.5 sm:p-2 group-hover:bg-white/35 transition-colors duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold">Services</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Welcome;
