import React from 'react';
import Stats from './Stats';

const ProfileHero = ({ profile, athlete }) => {
  return (
    <div className="flex items-center space-x-6 justify-between flex-col xl:flex-row">
      <div className='flex gap-8 items-center'>
      <img
        src={profile.picture_url || 'https://via.placeholder.com/150'}
        alt={profile.name}
        className="w-32 h-32 rounded-full object-cover border-4 border-white"
      />
        <h1 className="text-7xl font-bold">{profile.name}</h1>
      </div>
        <Stats athlete={athlete} />
    </div>
  );
};

export default ProfileHero;
