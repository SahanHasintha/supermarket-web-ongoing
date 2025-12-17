import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    // { name: 'Welcome', path: '/' }, // Hidden - Welcome page is disabled
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-white via-emerald-50 to-white shadow-lg sticky top-0 z-50 border-b-2 border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <img 
                  src="/Market logo.png" 
                  alt="Wynnum Mini Supermarket Logo" 
                  className="h-16 w-auto object-contain md:h-20"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Wynnum Mini Supermarket
                </span>
                <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
                      link.name === 'Welcome'
                        ? isActive(link.path)
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 shadow-lg font-bold'
                          : 'bg-white text-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-white shadow-md font-bold hover:shadow-2xl transform hover:scale-105'
                        : isActive(link.path)
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-emerald-600 hover:text-white hover:shadow-2xl transform hover:scale-105'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold px-4 py-2.5 rounded-full border-2 border-emerald-600 hover:border-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Hamburger Menu Button (Mobile) */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-white via-emerald-50 to-teal-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden border-l-4 border-emerald-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 bg-gradient-to-r from-emerald-500 to-teal-500">
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col px-4 space-y-3 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={`px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                link.name === 'Welcome'
                  ? isActive(link.path)
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 shadow-lg font-bold'
                    : 'bg-white text-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-white shadow-md font-bold hover:shadow-2xl transform hover:scale-105'
                  : isActive(link.path)
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-600 hover:text-white hover:shadow-2xl transform hover:scale-105'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Auth Buttons */}
          <Link
            to="/login"
            onClick={closeMobileMenu}
            className="px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-2xl transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={closeMobileMenu}
            className="px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow-2xl transform hover:scale-105"
          >
            Register
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-emerald-500 to-teal-500">
          <p className="text-sm text-white font-medium text-center">
            Wynnum Mini Supermarket
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;

