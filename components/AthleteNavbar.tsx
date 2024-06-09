'use client'
/* eslint-disable @next/next/no-img-element */
// components/Navbar.js

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/welcome';
  };

  return (
    <nav className="shadow-md w-full z-10 mb-10">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <div className="flex items-center group">
                <img
                  src="https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/Picture2.png"
                  alt="logo"
                  width={110}
                  height={110}
                  className='mt-2'
                />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 gap-12 transition-all duration-300 ease-in-out">
              <a
                href="/athlete/dashboard"
                className=" hover:text-orange-500 transform hover:scale-110 transition-all duration-300 ease-in-out"
              >
                Dashboard
              </a>
              <a
                href="/athlete/buy"
                className=" hover:text-orange-500 transform hover:scale-110 transition-all duration-300 ease-in-out"
              >
                Buy Slots
              </a>
              <a
                href="/athlete/join"
                className=" hover:text-orange-500 transform hover:scale-110 transition-all duration-300 ease-in-out"
              >
                Join Slots
              </a>
              <a
                href="/myprofile"
                className=" hover:text-orange-500 transform hover:scale-110 transition-all duration-300 ease-in-out"
              >
                My Profile
              </a>
              <button
                onClick={handleSignOut}
                className="text-red-500 hover:text-orange-500 transform hover:scale-110 transition-all duration-300 ease-in-out px-4 py-2 rounded-md focus:outline-none"
              >
                Log Out
              </button>
            </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-orange-500 hover:text-white">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-orange-500 hover:text-white">Buy Slots</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-orange-500 hover:text-white">Join Slots</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-orange-500 hover:text-white">My Profile</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-orange-500 hover:text-white">Log Out</a>
          </div>
        </div>
      )}
    </nav>
  );
}
