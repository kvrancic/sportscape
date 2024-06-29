// /components/SegmentedControl.js
import { useState } from 'react';

const SegmentedControl = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div >
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleOptionChange(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
