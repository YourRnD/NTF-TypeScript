import React from 'react';
import Style from './Input.module.css';

type PropsType = {
  placeholder: string;
  type: string;
  name: string;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input: React.FC<PropsType> = ({
  placeholder,
  type,
  name,
  onBlur,
  onFocus,
  onChange,
  value,
}) => {
  return (
    <div className={Style.container}>
      <span className={Style.placeholder}>{placeholder}</span>
      <input
        placeholder={placeholder}
        className={Style.elem}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
