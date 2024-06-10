'use client';

import React, { useState } from 'react';
import { Textarea, TextInput, Button, Group, Loader, Notification } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';

const sportsEmojis = {
  basketball: '🏀',
  football: '⚽',
  volleyball: '🏐',
};

const EditSlot = ({ slot }) => {
  const supabase = createClient();
  const [name, setName] = useState(slot.name);
  const [description, setDescription] = useState(slot.description);
  const [selectedSports, setSelectedSports] = useState({
    basketball: slot.basketball_available,
    football: slot.football_available,
    volleyball: slot.volleyball_available,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleSport = (sport) => {
    setSelectedSports((prevState) => ({
      ...prevState,
      [sport]: !prevState[sport],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updates = {
      name,
      description,
      basketball_available: selectedSports.basketball,
      football_available: selectedSports.football,
      volleyball_available: selectedSports.volleyball,
    };

    const { error } = await supabase
      .from('slot')
      .update(updates)
      .eq('slot_id', slot.slot_id);

    if (error) {
      console.error('Error updating slot:', error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      console.log('Slot updated successfully');
    }
    setLoading(false);
  };

  return (
    <div className={`shadow-xl rounded-lg p-6 mt-4 ${success ? 'border border-green-500' : ''}`}>
      <h2 className="text-lg font-semibold uppercase text-orange-500 mb-4 text-center">Edit Slot</h2>
      {success && (
        <Notification color="green" title="Success">
          Changes successfully saved!
        </Notification>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <TextInput
          label="Slot Name"
          placeholder={slot.name}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />
        <Textarea
          label="Description"
          placeholder={slot.description}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          required
          autosize
          minRows={4}
        />
        <div>
          <label className="block text-sm font-medium">Sports Available</label>
          <p className="text-sm">Current selection: {Object.keys(selectedSports).filter((sport) => selectedSports[sport]).map((sport) => sportsEmojis[sport]).join(' ')}</p>
          <div className="flex flex-wrap gap-4 mt-2">
            {Object.keys(sportsEmojis).map((sport) => (
              slot[`${sport}_available`] && (
                <Button
                  key={sport}
                  variant={selectedSports[sport] ? 'filled' : 'outline'}
                  color="orange"
                  onClick={() => toggleSport(sport)}
                >
                  {sportsEmojis[sport]}
                </Button>
              )
            ))}
          </div>
        </div>
        <div className="text-center">
          <Button type="submit" color="orange" className="bg-orange-500 hover:bg-orange-600">
            {loading ? <Loader color="white" size="sm" /> : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSlot;
