import { useState, useEffect } from 'react';
import { Rating, Textarea, Button, Notification, Switch } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';
import { IconCheck, IconX } from '@tabler/icons-react';

const AddReview = ({ toUserId }) => {
  const supabase = createClient();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);
      const { data: review } = await supabase
        .from('user_review')
        .select('*')
        .eq('from_user_id', userData.user.id)
        .eq('to_user_id', toUserId)
        .single();

      if (review) {
        setAlreadyReviewed(true);
      }
    };

    fetchUser();
  }, [supabase, toUserId]);

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('user_review')
      .insert([
        {
          from_user_id: user.id,
          to_user_id: toUserId,
          text,
          rating,
          anonymous,
        },
      ]);

    if (error) {
      setError(true);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-4 rounded-lg mt-4 shadow-md">
      {submitted ? (
        <Notification icon={<IconCheck size="1.1rem" />} color="teal" title="Review Submitted" disallowClose>
          Your review has been submitted successfully.
        </Notification>
      ) : (
        <div>
          {alreadyReviewed ? (
            <Notification icon={<IconX size="1.1rem" />} color="red" title="Review Already Posted" disallowClose>
              You have already posted a review for this user.
            </Notification>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={user?.picture_url || 'https://via.placeholder.com/40'}
                  alt="Your profile"
                  className="w-10 h-10 rounded-full"
                />
                <Textarea
                  placeholder="Write your review"
                  value={text}
                  onChange={(e) => setText(e.currentTarget.value)}
                  autosize
                  minRows={3}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Rating value={rating} onChange={setRating} color="orange" size="xl" />
                <Switch
                  label="Post anonymously"
                  checked={anonymous}
                  onChange={(event) => setAnonymous(event.currentTarget.checked)}
                />
              </div>
              {error && (
                <Notification icon={<IconX size="1.1rem" />} color="red" title="Error" disallowClose>
                  An error occurred while submitting your review. Please try again.
                </Notification>
              )}
              <Button className="mt-4" onClick={handleSubmit}>
                Post Review
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AddReview;
