"use client";

import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faSignOutAlt,
  faSun,
  faMoon,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const LayoutSite = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIconsLoaded(true);
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    window.dispatchEvent(new Event('storage'));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const menuItems = [
    {
      label: 'Trang chủ',
      icon: iconsLoaded && <FontAwesomeIcon icon={faHome} className={`${isMobile ? '' : 'mr-3'} text-blue-500`} size="sm" />,
      command: () => window.location.href = '/',
      className: `w-full flex items-center px-4 py-3 text-base font-medium transition-all duration-300 ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-800 hover:bg-blue-50'} rounded-lg mb-2` 
    },
    {
      label: 'Nhân viên',
      icon: iconsLoaded && <FontAwesomeIcon icon={faUser} className={`${isMobile ? '' : 'mr-3'} text-blue-500`} size="sm" />,
      command: () => window.location.href = '/employees',
      className: `w-full flex items-center px-4 py-3 text-base font-medium transition-all duration-300 ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-800 hover:bg-blue-50'} rounded-lg mb-2`
    }
  ];

  const logoutItem = {
    label: 'Đăng xuất',
    icon: iconsLoaded && <FontAwesomeIcon icon={faSignOutAlt} className={`${isMobile ? '' : 'mr-3'} text-red-500`} size="sm" />,
    command: () => window.location.href = '/logout',
    className: `w-full flex items-center px-4 py-3 text-base font-medium transition-all duration-300 ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-800 hover:bg-blue-50'} rounded-lg`
  };

  const headerItems = [
    {
      label: !isMobile && 'Chế độ',
      icon: iconsLoaded && <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-yellow-500" size="sm" />,
      command: () => setDarkMode(!darkMode),
      className: `hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-300 px-3 py-2 rounded-full ${darkMode ? 'text-gray-100 hover:text-black' : 'text-gray-800 hover:text-black'}`
    }
  ];

  if (!iconsLoaded) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className={`fixed top-0 w-full z-10 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <Button
              icon={<FontAwesomeIcon icon={faBars} size="sm" />}
              className={`p-2 mr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'}`}
              onClick={() => setSidebarVisible(!sidebarVisible)}
            />
            <h5 className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-blue-700'}`}>
              Dashboard
            </h5>
          </div>
          <div className="flex gap-1">
            {headerItems.map((item, index) => (
              <button
                key={index}
                onClick={item.command}
                className={`flex items-center p-2 ${item.className}`}
              >
                {item.icon}
                <span className="ml-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex pt-14">
        {/* Sidebar */}
        <div className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] transition-all duration-300 z-20
          ${sidebarVisible ? (isMobile ? 'w-16' : 'w-64') : 'w-0'} 
          ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}>
          <div className="flex flex-col h-full p-2">
            <div className="flex-1 space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.command}
                  className={`${item.className} ${!sidebarVisible || isMobile ? 'justify-center px-2' : ''}`}
                >
                  {item.icon}
                  {(sidebarVisible && !isMobile) && <span>{item.label}</span>}
                </button>
              ))}
            </div>
            <button
              onClick={logoutItem.command}
              className={`${logoutItem.className} ${!sidebarVisible || isMobile ? 'justify-center px-2' : ''}`}
            >
              {logoutItem.icon}
              {(sidebarVisible && !isMobile) && <span>{logoutItem.label}</span>}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? (isMobile ? 'ml-16' : 'ml-64') : 'ml-0'} min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
          <div className="p-4">
            {React.cloneElement(children, { darkMode })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSite;