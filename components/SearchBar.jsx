'use client'

// /components/SearchBar.js
import { useState } from 'react';

export default function SearchBar({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="relative xl:w-[900px] lg:w-[800px] w-[90%]">
        <input 
          type="text" 
          className="w-full py-3 pl-10 pr-14 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" 
          placeholder="🔍 Enter keywords or use filters to search" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 focus:outline-none"
          onClick={handleSearch}
        >
          ➔
        </button>
      </div>
    </div>
  );
}
