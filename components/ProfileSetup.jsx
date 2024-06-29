// app/components/ProfileSetup.js
'use client'

import React, { useState } from 'react';
import Step1 from './Step1';
import AthleteForm from './AthleteForm';
import VendorForm from './VendorForm';
import FinalizeProfile from './FinalizeProfile';

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    userType: '',
    athleteData: null,
    vendorData: null,
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleUserData = (data) => {
    if (profileData.userType === 'athlete') {
      setProfileData({ ...profileData, athleteData: data });
    } else {
      setProfileData({ ...profileData, vendorData: data });
    }
    nextStep();
  };

  switch (step) {
    case 1:
      return <Step1 setUserType={(type) => setProfileData({ ...profileData, userType: type })} nextStep={nextStep} />;
    case 2:
      return profileData.userType === 'athlete' ? <AthleteForm onSubmit={handleUserData} /> : <VendorForm onSubmit={handleUserData} />;
    case 3:
      return <FinalizeProfile data={profileData} />;
    default:
      return <div>Unknown step</div>;
  }
};

export default ProfileSetup;
