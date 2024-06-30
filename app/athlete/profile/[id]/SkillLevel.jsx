import React from 'react';
import { Rating } from '@mantine/core';

const SkillLevel = ({ athlete }) => {
  const basketballIcon = <span role="img" aria-label="basketball" className='text-[2.5rem] items-center justify-center'>🏀</span>;
  const footballIcon = <span role="img" aria-label="football" className='text-[2.5rem] items-center justify-center'>⚽</span>;
  const volleyballIcon = <span role="img" aria-label="volleyball" className='text-[2.5rem] items-center justify-center'>🏐</span>;

  const customEmptyIcon = () => (
    <span className="relative flex items-center justify-center bg-gray-300 rounded-full space-x-4" style={{ width: '3rem', height: '3rem' }}></span>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Skill Levels</h2>
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg sm:text-xl font-semibold text-gray-700 w-32">Basketball</p>
          <Rating
            value={athlete.basketball_skill}
            readOnly
            emptySymbol={customEmptyIcon()}
            fullSymbol={basketballIcon}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-lg sm:text-xl font-semibold text-gray-700 w-32">Football</p>
          <Rating
            value={athlete.football_skill}
            readOnly
            emptySymbol={customEmptyIcon()}
            fullSymbol={footballIcon}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-lg sm:text-xl font-semibold text-gray-700 w-32">Volleyball</p>
          <Rating
            value={athlete.volleyball_skill}
            readOnly
            emptySymbol={customEmptyIcon()}
            fullSymbol={volleyballIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillLevel;
