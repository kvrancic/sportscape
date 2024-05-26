// app/components/FinalizeProfile.js
import React from 'react';

const FinalizeProfile = ({ data }) => {
  return (
    <div>
      <h1>Review Your Information</h1>
      <p>Type: {data.userType}</p>
      {data.userType === 'athlete' ? (
        <div>
          <p>Sport: {data.athleteData.sport}</p>
          <p>Level: {data.athleteData.level}</p>
        </div>
      ) : (
        <div>
          <p>Business Info: {data.vendorData.businessInfo}</p>
        </div>
      )}
      <button>Submit Profile</button>
    </div>
  );
};

export default FinalizeProfile;
