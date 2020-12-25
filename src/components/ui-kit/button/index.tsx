import React, { FC, ReactNode } from 'react';
import './style.scss';

interface ButtonProps {
  type: 'primary' | 'secondary';
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ type = 'primary', icon, text, onClick }) => {
  return (
    <button className={`button button__${type}`} onClick={onClick}>
      <div className="button__icon">{icon}</div>
      <span>{text}</span>
    </button>
  );
};

export default Button;
