// /components/slot/SlotBasicInfo.js
import React from 'react';
import GoogleMapComponent from '@/components/GoogleMapComponent';

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

  const defaultCoordinatesMessage = (
    <div className="flex items-center justify-center h-full text-gray-500 text-xl">
      😢 No precise data to be shown for the maps
    </div>
  );

  const center = { lat: parseFloat(slot.lat), lng: parseFloat(slot.lng) };

  return (
    <div className="w-full">
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
