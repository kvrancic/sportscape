'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, FileInput, Radio, Group, Stack, Text, NumberInput, Button, Space } from '@mantine/core';
import { IconUser, IconBuildingStore, IconBallBasketball, IconBallFootball, IconBallVolleyball } from '@tabler/icons-react';
import classes from './FinalizeProfile.module.css';

export default function PrivatePage() {
  const [accountType, setAccountType] = useState();
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [aboutMe, setAboutMe] = useState('');
  const [basketballSkill, setBasketballSkill] = useState();
  const [footballSkill, setFootballSkill] = useState();
  const [volleyballSkill, setVolleyballSkill] = useState();

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      name,
      profilePicture,
      accountType,
      age,
      height,
      weight,
      aboutMe,
      basketballSkill,
      footballSkill,
      volleyballSkill,
    });
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <p>Please complete your profile setup to start using the platform.</p>
      
      <TextInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        required
      />
      
      <FileInput
        label="Profile Picture"
        placeholder="Upload your profile picture"
        value={profilePicture}
        onChange={setProfilePicture}
        required
      />

      <Radio.Group
        value={accountType}
        onChange={setAccountType}
        label="Choose your account type"
        required
      >
        <Stack pt="md" gap="xs">
          <Radio value="athlete" label={<Group><IconUser /> Athlete</Group>} />
          <Radio value="vendor" label={<Group><IconBuildingStore /> Vendor</Group>} />
        </Stack>
      </Radio.Group>

      {accountType === 'athlete' && (
        <div>
          <NumberInput
            label="Age"
            placeholder="Enter your age"
            value={age}
            onChange={setAge}
            required
          />
          <NumberInput
            label="Height (cm)"
            placeholder="Enter your height"
            value={height}
            onChange={setHeight}
            required
          />
          <NumberInput
            label="Weight (kg)"
            placeholder="Enter your weight"
            value={weight}
            onChange={setWeight}
            required
          />
          <Text
            label="About Me"
            placeholder="Tell us about yourself"
            value={aboutMe}
            onChange={(event) => setAboutMe(event.currentTarget.value)}
            required
          />
          <NumberInput
            label="Basketball Skill Level"
            placeholder="Rate your skill from 1 to 5"
            value={basketballSkill}
            onChange={setBasketballSkill}
            min={1}
            max={5}
            required
          />
          <NumberInput
            label="Football Skill Level"
            placeholder="Rate your skill from 1 to 5"
            value={footballSkill}
            onChange={setFootballSkill}
            min={1}
            max={5}
            required
          />
          <NumberInput
            label="Volleyball Skill Level"
            placeholder="Rate your skill from 1 to 5"
            value={volleyballSkill}
            onChange={setVolleyballSkill}
            min={1}
            max={5}
            required
          />
        </div>
      )}

      <Space h="lg" />

      <Button onClick={handleSubmit}>Finish Setup</Button>
    </div>
  );
}
