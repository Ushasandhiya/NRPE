import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2024 Jasper Elite School. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              NRPE – Student Dropout Risk Prediction System v1.0
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">System Status: Active</span>
            </div>
            <div className="text-sm text-gray-400">
              <span className="hidden md:inline">Predicting dropout risks for better student outcomes</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;