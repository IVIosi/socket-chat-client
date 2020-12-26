import React, { FC, ReactNode } from 'react';
import './style.scss';

interface ButtonProps {
  type: 'primary' | 'secondary';
  icon?: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, type = 'primary', icon, onClick }) => {
  return (
    <button className={`button button__${type}`} onClick={onClick}>
      {icon && <div className="button__icon">{icon}</div>}
      {children}
    </button>
  );
};

export default Button;
