import React from 'react';
import { FormControlsType } from '../../../../types/componentsTypes';
import Input from './Input';

const InputContainer: React.FC<FormControlsType> = ({
  field,
  placeholder,
  type,
  setStateValue,
  value,
}) => {
  const onFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.placeholder = '';
    const span:
      | HTMLSpanElement
      | undefined
      | null = e.target?.parentNode?.querySelector('span');
    span != undefined && span != null ? (span.style.display = 'block') : false;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (value === '') {
      const span:
        | HTMLSpanElement
        | undefined
        | null = e.target?.parentNode?.querySelector('span');

      if (span != undefined && span != null) {
        const spanText: string | null = span.textContent;

        const input: HTMLInputElement = e.target;

        spanText != undefined && spanText != null
          ? (input.placeholder = spanText)
          : false;

        span.style.display = 'none';
      }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string | null = e.target.value;

    value != null ? setStateValue(value) : false;
  };

  return (
    <Input
      name={field.name}
      placeholder={placeholder}
      type={type}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputContainer;
