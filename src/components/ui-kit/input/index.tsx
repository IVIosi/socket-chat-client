import React, { ChangeEvent, FC, useState } from 'react';
import './style.scss';

interface InputProps {
  defaultValue: string;
  onChange?: (v: string) => void;
}

const Input: FC<InputProps> = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return <input className="input" value={value} onChange={(e) => handleChange(e)} />;
};

export default Input;
