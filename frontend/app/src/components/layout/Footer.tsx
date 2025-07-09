{/* <div className="border-t py-2 text-center">© 2025 Pharmacy System</div> */}

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Rice Predictor</p>
        {/* <p className="mt-1">
          Developed by <span className="font-semibold">Trí Khải</span>
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
