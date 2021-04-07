import React from 'react';
import { FormControlsType } from '../../../../types/componentsTypes';
import Style from './Input.module.css';

const Input: React.FC<FormControlsType> = ({ field, placeholder, type }) => {
  return (
    <div className={Style.container}>
      <span className={Style.placeholder}>{placeholder}</span>
      <input
        placeholder={placeholder}
        className={Style.elem}
        type={type}
        {...field}
      />
    </div>
  );
};

export default Input;
