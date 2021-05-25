import React from 'react';
import Style from './Input.module.css';

type PropsType = {
  placeholder: string;
  type: string;
  name: string;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: () => void;
  error: string | null;
  value: string;
};

const Input: React.FC<PropsType> = ({
  placeholder,
  type,
  name,
  onBlur,
  onFocus,
  onChange,
  error,
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
      {error !== null ? (
        <p data-testid="error" className={Style.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
