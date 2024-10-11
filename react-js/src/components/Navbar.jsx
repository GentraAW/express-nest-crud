import React from 'react';
import { Menu, X, Server, Zap, House } from 'lucide-react';
import Sidebar from './Sidebar';
import { useFramework } from '../utils/FrameworkContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { selectedFramework } = useFramework();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const backgroundColor =
    selectedFramework === 'express' ? 'bg-green-600' : 'bg-blue-600';

  return (
    <nav className={`px-6 py-4 text-white ${backgroundColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-white hover:text-gray-400"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-2 text-xl font-bold">
            <Link to="/">
              <House className="hover:text-gray-400" />
            </Link>

            <span className="font-extralight">|</span>
            <span>
              {selectedFramework === 'express' ? 'Express.js' : 'Nest.js'}
            </span>
            {selectedFramework === 'express' ? (
              <Server size={24} />
            ) : (
              <Zap size={24} />
            )}
          </div>
        </div>
        {/* Navbar content goes here */}
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
