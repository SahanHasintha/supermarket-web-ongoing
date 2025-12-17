import React from 'react';

const LocationMap: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500">
        <h3 className="text-2xl font-bold text-white text-center">Our Location</h3>
        <p className="text-emerald-100 text-center mt-2">188 Algester Rd, Calamvale QLD 4116</p>
      </div>
      <div className="relative w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.7969773845945!2d153.0346847!3d-27.8161111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9140e1c2a3e88f%3A0xf017d68f9f1a7f0!2s188%20Algester%20Rd%2C%20Calamvale%20QLD%204116!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wynnum Mini Supermarket Location"
        ></iframe>
      </div>
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-1">Opening Hours</h4>
            <p className="text-gray-600">Mon-Sat: 7am - 9pm</p>
            <p className="text-gray-600">Sunday: 8am - 8pm</p>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
            <p className="text-gray-600">(07) 1234 5678</p>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-1">Email</h4>
            <p className="text-gray-600">info@wynnummini.com.au</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;

