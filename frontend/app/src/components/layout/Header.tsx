import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const getLinkClass = (target: string) =>
    `hover:underline transition-colors duration-200 ${
      path === target ? "text-teal-600 dark:text-teal-300 font-semibold underline" : ""
    }`;

  return (
    <header className="bg-gray-100 dark:bg-[#030712] text-dark dark:text-white w-full fixed top-0 z-50 border-b border-b-gray-50 dark:border-b-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center ">
        <Link to="/" className="text-xl font-bold">
          Rice Predictor
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={getLinkClass("/home")}
            >
              Trang chủ
            </Link>
            <Link
              to="/predict"
              className={getLinkClass("/predict")}
            >
              Dự đoán
            </Link>
            <ThemeToggle />
          </nav>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black dark:text-white focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2 text-dark dark:text-white">
          <Link
            to="/"
            className={getLinkClass("/home")  + `block`}
            onClick={() => setMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            to="/predict"
            className={getLinkClass("/predict") + `block`}
            onClick={() => setMenuOpen(false)}
          >
            Dự đoán
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
