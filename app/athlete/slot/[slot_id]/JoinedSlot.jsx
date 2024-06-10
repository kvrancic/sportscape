'use client'

// /components/JoinedSlot.js
import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import SlotBasicInfo from './SlotBasicInfo';
import BoughtSlotInfo from './BoughtSlotInfo';
import Chat from './Chat';
import EditSlot from './EditSlot';
import JoinRequests from './JoinRequests';
import classes from './SegmentedControl.module.css';

const JoinedSlot = ({ slot }) => {
  const [selectedSection, setSelectedSection] = useState('Basic Info');

  const renderSection = () => {
    switch (selectedSection) {
      case 'Basic Info':
        return <SlotBasicInfo slot={slot} />;
      case 'People & Reviews':
        return <BoughtSlotInfo slot_id={slot.slot_id} addReview={true}/>;
      case 'Chat':
        return <Chat slot_id={slot.slot_id} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold uppercase text-orange-500 mb-4 text-center">T E A M&ensp;&ensp;M E M B E R </h2>
      <SegmentedControl
        data={['Basic Info', 'People & Reviews', 'Chat']}
        onChange={setSelectedSection}
        classNames={classes}
        radius="lg"
      />
      <div className="mt-4">{renderSection()}</div>
    </div>
  );
};

export default JoinedSlot;
