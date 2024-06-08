import React from 'react';
import { MultiSelect, Switch, RangeSlider } from '@mantine/core';
import classes from '@/components/SliderLabel.module.css';

function Filters({ sportTypes, daysOfWeek }) {
  return (
    <div className='mt-8 w-full'>
      <div className='p-5 border-4 border-orange-500 rounded-lg bg-white'>
        <div className='flex flex-col md:flex-row gap-16 p-4 mb-4'>
          <MultiSelect
            label="Sport Type 🏀"
            placeholder="Select sports"
            data={sportTypes}
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500 shadow-xl' }}
          />
          <MultiSelect
            label="Day of the Week 📅"
            placeholder="Select days"
            data={daysOfWeek}
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500 shadow-xl' }}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-24 pb-10 mb-4'>
          <div className='w-full shadow-xl'>
            <label className='block text-sm font-medium text-gray-700 pb-12'>Start Time 🕒</label>
            <RangeSlider
              labelAlwaysOn
              defaultValue={[0, 24]}
              min={0}
              max={24}
              step={0.25}
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
              defaultValue={[0, 24]}
              min={0}
              max={24}
              step={0.25}
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
            defaultChecked
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
