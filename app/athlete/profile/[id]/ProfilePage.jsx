'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProfileHero from './ProfileHero';
import SkillLevel from './SkillLevel';
import Stats from './Stats';
import Reviews from './Reviews';

const ProfilePage = ({ id }) => {
  const supabase = createClient();
  const [profile, setProfile] = useState(null);
  const [athlete, setAthlete] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('*')
          .eq('id', id)
          .single();

        if (profileError) throw profileError;

        // Fetch athlete data
        const { data: athleteData, error: athleteError } = await supabase
          .from('athlete')
          .select('*')
          .eq('athlete_id', id)
          .single();

        if (athleteError) throw athleteError;

        // Fetch reviews data
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('user_review')
          .select(`
            from_user_id,
            text,
            rating,
            from_profile:profile!usr_review_from_user_id_fkey (
              id,
              name,
              picture_url
            )
          `)
          .eq('to_user_id', id);

        if (reviewsError) throw reviewsError;

        setProfile(profileData);
        setAthlete(athleteData);
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, supabase]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!profile || !athlete) {
    return <div className="flex justify-center items-center h-screen">Profile not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-orange-500 shadow-lg rounded-lg p-8 mb-6">
        <ProfileHero profile={profile} athlete={athlete} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <SkillLevel athlete={athlete} />
        </div>
        <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <p className="text-3xl py-6">About me:</p>
          <p className="text-md font-bold text-gray-800 mb-4">{athlete.about}</p>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <Reviews reviews={reviews} athleteId={id} />
      </div>
    </div>
  );
};

export default ProfilePage;
