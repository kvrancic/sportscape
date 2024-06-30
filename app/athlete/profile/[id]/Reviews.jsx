'use client';

import React, { useEffect, useState } from 'react';
import { Rating, Notification, Textarea, Button } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

const Reviews = ({ reviews, athleteId }) => {
  const supabase = createClient();
  const [averageRating, setAverageRating] = useState(0);
  const [user, setUser] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [postedReview, setPostedReview] = useState(false);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRating / reviews.length;
      setAverageRating(avgRating);
    }
  }, [reviews, supabase]);

  const handlePostReview = async () => {
    if (user) {
      const { error } = await supabase
        .from('user_review')
        .insert({
          from_user_id: user.id,
          to_user_id: athleteId,
          text: newReview,
          rating,
        });

      if (error) {
        setNotification({ type: 'error', message: 'Error posting review' });
      } else {
        setNotification({ type: 'success', message: 'Review posted successfully' });
        setPostedReview(true);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Rating value={averageRating} color="orange" size="xl" readOnly />
      </div>
      <div className="text-center mt-2">
        Average score <strong>{averageRating.toFixed(1)}</strong> on <strong>{reviews.length}</strong> reviews
      </div>

      {notification.message && (
        <div className="mt-4">
          <Notification color={notification.type === 'error' ? 'red' : 'teal'} title={notification.type === 'error' ? 'Bummer!' : 'All good!'}>
            {notification.message}
          </Notification>
        </div>
      )}

      {!postedReview && (
        <div className="mt-6">
          <Textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.currentTarget.value)}
            autosize
            minRows={4}
            className="mb-4"
          />
          <div className="flex items-center space-x-4">
            <Rating value={rating} onChange={setRating} color="orange" />
          </div>
          <div className="mt-4">
            <Button onClick={handlePostReview} color="orange">Post Review</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.from_user_id} className="flex gap-4 bg-white p-4 rounded-lg shadow-md">
              <img
                src={review.from_profile.picture_url || 'https://via.placeholder.com/40'}
                alt={`${review.from_profile.name}'s picture`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-bold">
                  <Link href={`/athlete/profile/${review.from_user_id}`} className="text-blue-500 hover:underline">
                    {review.from_profile.name}
                  </Link>
                </div>
                <Rating value={review.rating} color="orange" size="sm" readOnly />
                <p>{review.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center mt-8">
            <img src="/Shrug-bro.svg" alt="No reviews" className="w-40 h-40" />
            <p className="font-bold">There are no reviews for this user!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
