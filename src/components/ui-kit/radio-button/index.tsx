import React, { ChangeEvent, FC, useState } from 'react';
import './style.scss';

interface RadioButtonProps {
  name: string;
  defaultValue: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  onChange?: (v: string) => void;
}

const RadioButton: FC<RadioButtonProps> = ({ name, defaultValue, options, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <>
      {options.map((option) => (
        <label key={option.value} className="radio-button">
          {option.label}
          <input
            type="radio"
            value={value}
            name={name}
            onChange={(e) => handleChange(e, option.value)}
          />
          <span
            className={`radio-button__checkmark radio-button__checkmark--${
              value === option.value ? 'checked' : 'unchecked'
            }`}
          />
        </label>
      ))}
    </>
  );
};

export default RadioButton;
