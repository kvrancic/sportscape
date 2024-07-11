'use client';

import React, { useEffect, useState } from 'react';
import { Rating } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import AddReview from './AddReview';

const Reviews = ({ reviews, addReview, slot_id }) => {
  const supabase = createClient();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRating / reviews.length;
      setAverageRating(avgRating);
    }
  }, [reviews]);

  return (
    <div className="flex flex-col gap-4">
      {addReview && (
        <div className="flex justify-center">
          <AddReview slot_id={slot_id} />
        </div>
      )}

      <div className="flex-col justify-center">
        <h2 className="font-bold text-center text-xl mt-6">REVIEWS</h2>
        <div className="flex justify-center mt-2">
          <Rating value={averageRating} color="orange" size="xl" fractions={4} readOnly />
        </div>
        
      </div>
      <div className="text-center">
        Average score <strong>{averageRating.toFixed(1)}</strong> on <strong>{reviews.length}</strong> reviews
      </div>

      

      <div className="flex flex-col gap-4 mt-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.athlete_id} className="flex gap-4 p-4 rounded-lg shadow-md">
              <img
                src={review.is_anonymous ? 'https://via.placeholder.com/40' : review.profile.picture_url || 'https://via.placeholder.com/40'}
                alt={`${review.is_anonymous ? 'Anonymous' : review.profile.name}'s picture`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-bold">
                  {review.is_anonymous ? (
                    'Anonymous Member'
                  ) : (
                    <Link href={`/athlete/profile/${review.athlete_id}`} className="text-blue-500 hover:underline">
                      {review.profile.name}
                    </Link>
                  )}
                </div>
                <Rating value={review.rating} color="orange" size="sm" readOnly />
                <p>{review.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center mt-8">
            <img src="/Shrug-bro.svg" alt="No reviews" className="w-40 h-40" />
            <p className="font-bold">There are no reviews for this slot!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
