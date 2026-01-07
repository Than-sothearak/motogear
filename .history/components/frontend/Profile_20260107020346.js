"use client";
import React, { useState, useRef, useEffect } from "react";
import { RiUserLine } from "react-icons/ri";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <RiUserLine size={24} />
      </button>

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className={`
          absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg
          transform origin-top-right transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="p-4">
          <p className="font-semibold text-gray-800">John Doe</p>
          <h1 className="text-sm text-gray-500">email@example.com</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
