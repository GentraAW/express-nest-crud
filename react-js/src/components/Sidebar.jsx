import React from 'react';
import {
  X,
  Server,
  Zap,
  ChartNoAxesCombined,
  Cookie,
  Users,
  Handshake,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFramework } from '../utils/FrameworkContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { selectedFramework } = useFramework();
  const location = useLocation();
  const backgroundColor =
    selectedFramework === 'express' ? 'bg-green-600' : 'bg-blue-600';
  const hoverColor =
    selectedFramework === 'express'
      ? 'hover:bg-green-700'
      : 'hover:bg-blue-700';
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 ${backgroundColor} text-white transition-all duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-400">
        <div className="flex">
          <h2 className="mr-2 text-xl font-bold">
            {selectedFramework === 'express' ? 'Express.js' : 'Nest.js'}
          </h2>
          <span className="mt-1">
            {selectedFramework === 'express' ? (
              <Server size={24} />
            ) : (
              <Zap size={24} />
            )}
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-400"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`px-4 py-2 flex ${hoverColor} ${
                location.pathname === '/dashboard' ? `${backgroundColor}` : ''
              }`}
            >
              <ChartNoAxesCombined className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/customer"
              className={`flex px-4 py-2 ${hoverColor} ${
                location.pathname === '/customer' ? `${backgroundColor}` : ''
              }`}
            >
              <Users className="mr-2" />
              Customers
            </Link>
          </li>
          <li>
            <Link
              to="/food"
              className={`flex px-4 py-2 ${hoverColor} ${
                location.pathname === '/food' ? `${backgroundColor}` : ''
              }`}
            >
              <Cookie className="mr-2" />
              Foods
            </Link>
          </li>
          <li>
            <Link
              to="/transaction"
              className={`flex px-4 py-2 ${hoverColor} ${
                location.pathname === '/transaction' ? `${backgroundColor}` : ''
              }`}
            >
              <Handshake className="mr-2" />
              Transactions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
