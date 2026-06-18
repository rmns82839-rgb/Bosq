import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { BookOpenIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-cursive text-primary-600 dark:text-primary-400">✝️ Bosqu</span>
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-4">
            <Link to="/bosquejos" className="flex flex-col sm:flex-row items-center p-2 sm:p-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <BookOpenIcon className="w-6 h-6 sm:w-5 sm:h-5 sm:mr-1" />
              <span className="text-xs sm:text-sm">Bosquejos</span>
            </Link>
            <Link to="/buscar-biblia" className="flex flex-col sm:flex-row items-center p-2 sm:p-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <MagnifyingGlassIcon className="w-6 h-6 sm:w-5 sm:h-5 sm:mr-1" />
              <span className="text-xs sm:text-sm">Biblia</span>
            </Link>
            <button onClick={handleLogout} className="flex flex-col sm:flex-row items-center p-2 sm:p-1 text-gray-600 dark:text-gray-300 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ArrowRightOnRectangleIcon className="w-6 h-6 sm:w-5 sm:h-5 sm:mr-1" />
              <span className="text-xs sm:text-sm">Salir</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
