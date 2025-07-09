import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icon từ lucide-react

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Rice Predictor
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>
          <Link to="/predict" className="hover:underline">
            Dự đoán
          </Link>
          {/* <Link to="/about" className="hover:underline">
            Giới thiệu
          </Link> */}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-blue-500 px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Trang chủ
          </Link>
          <Link to="/predict" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Dự đoán
          </Link>
          <Link to="/about" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Giới thiệu
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
