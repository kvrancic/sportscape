'use client'

import React, { useState } from 'react';
import { Button } from '@mantine/core';
import SearchBar from '@/components/SearchBar';
import Filters from './Filters';

function BuySlots() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportTypes] = useState(['Football', 'Basketball', 'Tennis', 'Swimming']);
  const [daysOfWeek] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className='w-[95%] xl:w-3/5 py-11 bg-gray-500 h-auto px-10'>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col align-center items-center justify-center">
            <div className="flex 2xl:flex-row flex-col relative align-baseline items-baseline gap-4">
              <p className='text-4xl font-bold -mb-6 relative z-20'>Let&apos;s pick your new</p>
              <p className='text-8xl font-black text-orange-500 relative z-10'>SECOND HOME!</p>
            </div>
            <SearchBar setSearchQuery={setSearchQuery} />
            <div className="mt-4">
              <p className='font-bold text-orange-500 shadow-xl'>Search Query: {searchQuery}</p>
            </div>
          </div>
          <Button className="mt-8" color="orange" onClick={toggleFilters}>
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {filtersVisible && <Filters sportTypes={sportTypes} daysOfWeek={daysOfWeek} />}
        </div>
      </div>
    </div>
  );
}

export default BuySlots;
