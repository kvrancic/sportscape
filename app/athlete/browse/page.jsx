'use client'

import React, { useState } from 'react';
import { Button } from '@mantine/core';
import SearchBar from '@/components/SearchBar';
import Filters from './Filters';
import Gallery from './Gallery';
import SegmentedControl from './SegmentedControl';

function BuySlots() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportTypes, setSportTypes] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [startTimeRange, setStartTimeRange] = useState([0, 24]);
  const [endTimeRange, setEndTimeRange] = useState([0, 24]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [onlyWithImage, setOnlyWithImage] = useState(false);
  const [selectedOption, setSelectedOption] = useState('buy');

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const isAvailable = selectedOption === 'buy';

  return (
    <div className='flex justify-center items-center w-screen'>
      <div className='w-[95%] xl:w-4/5 py-11 px-10'>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col align-center items-center justify-center mt-8">
            <div className="flex 2xl:flex-row flex-col relative align-baseline items-baseline gap-4">
              <p className='text-4xl font-bold -mb-6 relative z-20 drop-shadow-xl'>
                {isAvailable ? "Let's pick your new" : "Let's pick your new"}
              </p>
              <p className='text-8xl font-black text-orange-500 relative z-10 drop-shadow-xl'>
                {isAvailable ? 'SECOND HOME!' : 'SECOND FAMILY!'}
              </p>
            </div>
            <SegmentedControl selected={selectedOption} setSelected={setSelectedOption} />
            <SearchBar setSearchQuery={setSearchQuery} />
            <div className="mt-4">
              <p className='font-bold text-orange-500 shadow-xl'>Search Query: {searchQuery}</p>
            </div>
          </div>
          <Button className="mt-8" color="orange" onClick={toggleFilters}>
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {filtersVisible && (
            <Filters 
              sportTypes={sportTypes}
              setSportTypes={setSportTypes}
              daysOfWeek={daysOfWeek}
              setDaysOfWeek={setDaysOfWeek}
              startTimeRange={startTimeRange}
              setStartTimeRange={setStartTimeRange}
              endTimeRange={endTimeRange}
              setEndTimeRange={setEndTimeRange}
              onlyWithImage={onlyWithImage}
              setOnlyWithImage={setOnlyWithImage}
            />
          )}
        </div>
        <Gallery
          searchQuery={searchQuery}
          sportTypes={sportTypes}
          daysOfWeek={daysOfWeek}
          startTimeRange={startTimeRange}
          endTimeRange={endTimeRange}
          onlyWithImage={onlyWithImage}
          isAvailable={isAvailable}
        />
      </div>
    </div>
  );
}

export default BuySlots;
