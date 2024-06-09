import React from 'react';

const SegmentedControl = ({ selected, setSelected }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="bg-white shadow-md border rounded-full p-1">
        <button
          className={`px-4 py-2 rounded-full focus:outline-none ${
            selected === 'buy' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : ''
          }`}
          onClick={() => setSelected('buy')}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 rounded-full focus:outline-none ${
            selected === 'join' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : ''
          }`}
          onClick={() => setSelected('join')}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default SegmentedControl;
