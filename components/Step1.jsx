// app/components/Step1.js
import React from 'react';

const Step1 = ({ setUserType, nextStep }) => {
  return (
    <div>
      <h1>Choose Account Type</h1>
      <button onClick={() => { setUserType('athlete'); nextStep(); }}>Athlete</button>
      <button onClick={() => { setUserType('vendor'); nextStep(); }}>Vendor</button>
    </div>
  );
};

export default Step1;
