import React from 'react';
import { MultiSelect, Switch, RangeSlider } from '@mantine/core';
import classes from '@/components/SliderLabel.module.css';

function Filters({
  sportTypes, setSportTypes,
  daysOfWeek, setDaysOfWeek,
  startTimeRange, setStartTimeRange,
  endTimeRange, setEndTimeRange,
  onlyWithImage, setOnlyWithImage,
}) {
  return (
    <div className='mt-8 w-full'>
      <div className='p-5 border-4 shadow-orange-500 shadow-md rounded-lg'>
        <div className='flex flex-col md:flex-row gap-16 p-4 mb-4'>
          <MultiSelect
            label="Sport Type 🏀"
            placeholder="Select sports"
            data={['Football', 'Basketball', 'Tennis', 'Swimming']}
            value={sportTypes}
            onChange={setSportTypes}
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500 shadow-xl' }}
          />
          <MultiSelect
            label="Day of the Week 📅"
            placeholder="Select days"
            data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
            value={daysOfWeek}
            onChange={setDaysOfWeek}
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500 shadow-xl' }}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-24 pb-10 mb-4'>
          <div className='w-full shadow-xl'>
            <label className='block text-sm font-medium text-gray-700 pb-12'>Start Time 🕒</label>
            <RangeSlider
              labelAlwaysOn
              value={startTimeRange}
              onChange={setStartTimeRange}
              min={0}
              max={24}
              step={0.25}
              minRange={1}
              marks={[
                { value: 0, label: '00:00' },
                { value: 6, label: '06:00' },
                { value: 12, label: '12:00' },
                { value: 18, label: '18:00' },
                { value: 24, label: '24:00' },
              ]}
              classNames={classes}
            />
          </div>
          <div className='w-full shadow-xl'>
            <label className='block text-sm font-medium text-gray-700 pb-12'>End Time 🕒</label>
            <RangeSlider
              labelAlwaysOn
              value={endTimeRange}
              onChange={setEndTimeRange}
              min={0}
              max={24}
              step={0.25}
              minRange={1}
              marks={[
                { value: 0, label: '00:00' },
                { value: 6, label: '06:00' },
                { value: 12, label: '12:00' },
                { value: 18, label: '18:00' },
                { value: 24, label: '24:00' },
              ]}
              classNames={classes}
            />
          </div>
        </div>
        <div className='mt-4'>
          <Switch
            checked={onlyWithImage}
            onChange={(event) => setOnlyWithImage(event.currentTarget.checked)}
            color="orange"
            label="Only show listings with an image 🖼️"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
