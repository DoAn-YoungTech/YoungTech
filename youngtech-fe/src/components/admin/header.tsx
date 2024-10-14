import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faSun, faBell } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
    return (
        <header className="flex justify-between items-center bg-white shadow-md px-4 py-2">
            <div className="flex items-center">
                <button onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} className="text-xl text-gray-600" />
                </button>
                <div className="ml-4 relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-1 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faSun} className="text-xl text-gray-600" />
                <FontAwesomeIcon icon={faBell} className="text-xl text-gray-600" />
                <div className="relative">
                    <img src="https://antimatter.vn/wp-content/uploads/2022/04/hinh-meo-khoc-tha-like.jpg"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
            </div>
        </header>
    );
};

export default Header;