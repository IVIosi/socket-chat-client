import React, { FC, ReactNode, MouseEvent } from 'react';
import './style.scss';

interface ButtonProps {
  disabled?: boolean;
  type: 'primary' | 'secondary' | 'iconic';
  icon?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ children, disabled, type = 'primary', icon, onClick }) => {
  return (
    <button
      disabled={disabled}
      className={`button button__${type}`}
      onClick={(e) => onClick && onClick(e)}
    >
      {icon && <div className="button__icon">{icon}</div>}
      {children}
    </button>
  );
};

export default Button;
