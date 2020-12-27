import React, { FC, ReactNode, MouseEvent } from 'react';
import './style.scss';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  type: 'primary' | 'secondary' | 'iconic';
  icon?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, label, disabled, type = 'primary', icon, onClick } = props;
  return (
    <button
      aria-label={label}
      disabled={disabled}
      className={`button button__${type}`}
      onClick={(e) => onClick && onClick(e)}
    >
      {icon && <div className="button__icon">{icon}</div>}
      <div className="button__text">{children}</div>
    </button>
  );
};

export default Button;
