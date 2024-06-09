import React, { useState, useEffect } from 'react';
import BuyCard from './BuyCard';
import { Pagination } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';

const Gallery = ({ searchQuery, sportTypes, daysOfWeek, startTimeRange, endTimeRange, onlyWithImage }) => {
  const supabase = createClient();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;
  const [facilities, setFacilities] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchFacilities = async () => {
      let query = supabase
        .from('slot')
        .select('*', { count: 'exact' })
        .eq('is_available', true);

      if (onlyWithImage) {
        query = query.not('slot_photo', 'is', null);
      }

      if (searchQuery) {
        query = query.textSearch('name', searchQuery, {
          type: 'websearch',
          config: 'english'
        });
      }

      if (sportTypes.length) {
        sportTypes.forEach((sport) => {
          query = query.eq(`${sport.toLowerCase()}_available`, true);
        });
      }

      if (daysOfWeek.length) {
        daysOfWeek.forEach((day) => {
          query = query.eq(`${day.toLowerCase()}_available`, true);
        });
      }

      query = query
        .gte('start_time', `${startTimeRange[0]}:00`)
        .lte('end_time', `${endTimeRange[1]}:00`);

      const { data, count, error } = await query.range((activePage - 1) * itemsPerPage, activePage * itemsPerPage - 1);

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setFacilities(data);
        setTotalItems(count);
      }
    };

    fetchFacilities();
  }, [activePage, searchQuery, sportTypes, daysOfWeek, startTimeRange, endTimeRange, onlyWithImage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="w-full mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {facilities.map((facility) => (
          <BuyCard key={facility.slot_id} facility={facility} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination total={totalPages} page={activePage} onChange={setActivePage} />
      </div>
    </div>
  );
};

export default Gallery;
