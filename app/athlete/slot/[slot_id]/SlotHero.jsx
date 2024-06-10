// /components/slot/SlotHero.js
import React from 'react';
import Link from 'next/link';

const SlotHero = ({ slot }) => {
  const defaultImage = 'https://via.placeholder.com/1500x500?text=No+Image+Available';

  return (
    <div className="relative w-full h-[500px]">
      <img 
        src={slot.slot_photo || defaultImage} 
        alt={slot.name} 
        className="object-cover w-full h-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
      <Link 
        href="/athlete/browse" 
        className="absolute top-0 left-0 p-4 text-gray-200 font-bold transition-transform duration-300 ease-in-out hover:scale-110"
      >
        ◀ Back to browse
      </Link>
      <div className="absolute bottom-0 left-0 p-8 transition-transform duration-300 ease-in-out hover:scale-105">
        <div className='text-gray-500 font-bold opacity-90 text-lg -mb-3 flex gap-3'>
          <p className='font-black'> Slot ID: </p>
          {slot.slot_id}
        </div>
        <h1 className="text-orange-500 drop-shadow-2xl text-6xl xl:text-8xl uppercase font-black transition-transform duration-300 ease-in-out">{slot.name}</h1>
        <p className='text-white text-lg font-bold mt-3'>⏰ Time: {slot.start_time} - {slot.end_time}</p>
        <p className='text-white text-lg font-bold'>📌 Address: {slot.address}</p>
      </div>
    </div>
  );
};

export default SlotHero;
