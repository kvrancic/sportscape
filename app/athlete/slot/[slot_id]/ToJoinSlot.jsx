'use client'

// /components/ToJoinSlot.js
import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import SlotBasicInfo from './SlotBasicInfo';
import BoughtSlotInfo from './BoughtSlotInfo';
import JoinRequestForm from './JoinRequestForm';
import classes from './SegmentedControl.module.css';

const ToJoinSlot = ({ slot }) => {
  const [selectedSection, setSelectedSection] = useState('Basic Info');

  const renderSection = () => {
    switch (selectedSection) {
      case 'Basic Info':
        return <SlotBasicInfo slot={slot} />;
      case 'People & Reviews':
        return <BoughtSlotInfo slot_id={slot.slot_id} addReview={false}/>;
      case 'Join Slot':
        return <JoinRequestForm slot={slot} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold uppercase text-orange-500 mb-4 text-center">J O I N&ensp;&ensp;T H E&ensp;&ensp;S L O T </h2>
      <SegmentedControl
        data={['Basic Info', 'People & Reviews', 'Join Slot']}
        onChange={setSelectedSection}
        classNames={classes}
        radius="lg"
      />
      <div className="mt-4">{renderSection()}</div>
    </div>
  );
};

export default ToJoinSlot;
