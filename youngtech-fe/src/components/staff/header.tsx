"use client";
import { useState } from 'react';
import { Transition } from '@headlessui/react';

const StaffHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a className="text-2xl font-bold text-gray-800 hover:text-gray-600" href="#">
          YONUNGTECH
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex items-center text-gray-800 hover:text-gray-600 focus:outline-none"
          onClick={toggleNavbar}
          aria-controls="navbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Menu Items */}
        <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="lg:flex lg:space-x-8 lg:items-center text-gray-800">
            <li className="group">
              <a className="block py-2 lg:py-0 transition-all hover:text-blue-600" href="#">Home</a>
              <div className="h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
            </li>
            <li className="group">
              <a className="block py-2 lg:py-0 transition-all hover:text-blue-600" href="#">Link</a>
              <div className="h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
            </li>
            <li>
              <a className="block py-2 lg:py-0 text-gray-400 cursor-not-allowed" aria-disabled="true">Disabled</a>
            </li>

            {/* Dropdown */}
            <li className="relative group">
              <button
                className="flex items-center py-2 lg:py-0 transition-all hover:text-blue-600 focus:outline-none"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                Dropdown
                <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <Transition
                show={dropdownOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Action</a></li>
                  <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Another action</a></li>
                  <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Something else here</a></li>
                </ul>
              </Transition>
            </li>
          </ul>
          <form className="ml-4 hidden lg:block">
            <input
              className="border rounded-lg p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;