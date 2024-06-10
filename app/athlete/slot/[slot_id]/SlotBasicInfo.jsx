// /components/slot/SlotBasicInfo.js
import React from 'react';
import Link from 'next/link';
import GoogleMapComponent from '../../../../components/GoogleMapComponent';

const dayAbbreviations = ['M😠', 'T😩', 'W😫', 'T😡', 'F😊', 'S🎉', 'S😌'];

const sportsEmojis = {
  basketball_available: '🏀',
  football_available: '⚽',
  volleyball_available: '🏐',
};

const SlotBasicInfo = ({ slot }) => {
  const availableDays = [
    slot.monday_available,
    slot.tuesday_available,
    slot.wednesday_available,
    slot.thursday_available,
    slot.friday_available,
    slot.saturday_available,
    slot.sunday_available,
  ];

  const defaultImage = 'https://via.placeholder.com/1500x500?text=No+Image+Available';
  const defaultCoordinatesMessage = (
    <div className="flex items-center justify-center h-full text-gray-500 text-xl">
      😢 No precise data to be shown for the maps
    </div>
  );

  const center = { lat: parseFloat(slot.lat), lng: parseFloat(slot.lng) };

  return (
    <div className="w-full p-4">
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
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-12 content-start xl:h-[470px] h-auto">
        <div className='content-center'>
          <div className="flex items-center">
            <div className="flex space-x-2 items-center font-bold">
              <div className='text-orange-500'> AVAILABLE DAYS: </div>
              {dayAbbreviations.map((day, index) => (
                <span 
                  key={index} 
                  className={`px-2 py-1 text-lg font-bold rounded-full hover:scale-125 transition-all duration-100 ease-in-out hover:cursor-pointer ${availableDays[index] ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-2 font-bold text-orange-500">
            SPORTS AVAILABLE:
            <div className="flex ml-2 space-x-2">
              {Object.keys(sportsEmojis).map((key) => slot[key] && <span className="text-2xl hover:scale-125 hover:cursor-pointer transition-all duration-100 ease-in-out" key={key}>{sportsEmojis[key]}</span>)}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-orange-500">DESCRIPTION:</h2>
            <p>{slot.description}</p>
          </div>
        </div>
        <div className="h-64">
          {slot.lat && slot.lng ? (
            <GoogleMapComponent center={center} />
          ) : (
            defaultCoordinatesMessage
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotBasicInfo;
