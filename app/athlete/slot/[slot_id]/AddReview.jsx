'use client';

import { useState, useEffect } from 'react';
import { Rating, Textarea, Button, Notification, Switch } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { createClient } from '@/utils/supabase/client';

const AddReview = ({ slot_id }) => {
  const supabase = createClient();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [is_anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data: profile, error } = await supabase
        .from('profile')
        .select('picture_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setAvatarUrl(profile.picture_url);
      }

      const { data, error: reviewError } = await supabase
        .from('slot_review')
        .select('*')
        .eq('slot_id', slot_id)
        .eq('athlete_id', user.id)
        .single();

      if (reviewError && reviewError.details !== 'Results contain 0 rows') {
        console.error('Error checking if reviewed:', reviewError);
      } else {
        setHasReviewed(!!data);
      }
    };

    fetchUser();
  }, [slot_id, supabase]);

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('slot_review')
      .insert([
        {
          athlete_id: user.id,
          slot_id,
          rating,
          text,
          is_anonymous,
        },
      ]);

    if (error) {
      console.error('Error posting review:', error);
      setError(true);
      setSuccess(false);
    } else {
      setSuccess(true);
      setError(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-[100%]">
      {hasReviewed ? (
        <div className="text-center tex-2xl">Review already posted.</div>
      ) : (
        <>
          {success && (
            <Notification icon={<IconCheck size={20} />} color="teal" title="All good!" onClose={() => setSuccess(false)}>
              Your review has been posted successfully!
            </Notification>
          )}
          {error && (
            <Notification icon={<IconX size={20} />} color="red" title="Bummer!" onClose={() => setError(false)}>
              Something went wrong, please try again.
            </Notification>
          )}
          <div className="flex-col gap-4 items-center my-4">
            <div className="text-xl font-bold mb-2">
              MY REVIEW:
            </div>
            <div className='flex '>
              <img src={avatarUrl || 'https://via.placeholder.com/40'} alt="User avatar" className="w-10 h-10 rounded-full" />
              <Rating value={rating} onChange={setRating} size="lg" color="orange" />
            </div>
          </div>
          <Textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            autosize
            minRows={4}
            className="mb-4"
          />
          <Switch
            label="Post anonymously"
            checked={is_anonymous}
            onChange={(event) => setAnonymous(event.currentTarget.checked)}
            className="mb-4"
          />
          <Button onClick={handleSubmit} color="orange">
            Post Review
          </Button>
        </>
      )}
    </div>
  );
};

export default AddReview;
