import React from 'react';

const Stats = ({ athlete }) => {
  return (
    <div>
      <div className="space-y-2 flex content-center gap-12 items-center">
      
        <div className="flex-col items-center align-middle content-center justify-center">
          <p className="2xl:text-6xl md:text-3xl text-xl text-white">{athlete.age}</p>
          <p className='font-bold text-white '>Age</p>
        </div>
        <div className="flex-col">
          <p className="2xl:text-6xl md:text-3xl text-xl text-white">{athlete.height}</p>
          <p className='font-bold text-white'>Height (cm)</p>
        </div>
        <div className="flex-col">
          <p className="2xl:text-6xl md:text-3xl text-xl text-white">{athlete.weight}</p>
          <p className='font-bold text-white'>Weight (kg)</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
