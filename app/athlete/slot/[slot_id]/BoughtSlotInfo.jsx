'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Reviews from './Reviews';
import ListPeople from './ListPeople';

const BoughtSlotInfo = ({ slot_id, addReview }) => {
  const supabase = createClient();
  const [reviews, setReviews] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      let { data: slot_reviews, error } = await supabase
        .from('slot_review')
        .select(`
          athlete_id,
          rating,
          text,
          is_anonymous,
          profile:profile (
            name,
            picture_url
          )
        `)
        .eq('slot_id', slot_id);
      
      if (error) {
        console.error('Error fetching slot reviews:', error);
      } else {
        console.log('Fetched slot reviews:', slot_reviews);
        setReviews(slot_reviews);
      }
    };

    const fetchPeople = async () => {
      let { data: slot_members, error } = await supabase
        .from('slot_member')
        .select(`
          athlete_id,
          is_owner,
          profile:profile (
            name,
            picture_url
          )
        `)
        .eq('slot_id', slot_id);
      
      if (error) {
        console.error('Error fetching slot members:', error);
      } else {
        console.log('Fetched slot members:', slot_members);
        setPeople(slot_members);
      }
    };

    fetchReviews();
    fetchPeople();
  }, [slot_id, supabase]);

  return (
    <div className="flex flex-col 2xl:flex-row gap-4 mt-4">
      <div className="flex-1 shadow-md p-4 rounded-lg">
        <Reviews reviews={reviews} addReview={addReview} slot_id={slot_id} />
      </div>
      <div className="flex-none 2xl:w-2/4 shadow-md p-4 rounded-lg">
        <h2 className="font-bold text-center text-xl">MEMBERS</h2>
        <ListPeople people={people} />
      </div>
    </div>
  );
};

export default BoughtSlotInfo;
