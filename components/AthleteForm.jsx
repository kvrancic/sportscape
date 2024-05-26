// app/components/AthleteForm.js
import React, { useState } from 'react';

const AthleteForm = ({ onSubmit }) => {
  const [data, setData] = useState({ sport: '', level: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={() => onSubmit(data)}>
      <label>Sport
        <input type="text" name="sport" value={data.sport} onChange={handleChange} />
      </label>
      <label>Level
        <input type="text" name="level" value={data.level} onChange={handleChange} />
      </label>
      <button type="submit">Next</button>
    </form>
  );
};

export default AthleteForm;
