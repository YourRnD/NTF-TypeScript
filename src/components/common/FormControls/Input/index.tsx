import React from 'react';
import { getErrorText } from '../../../../common/validate';
import { FormControlsType } from '../../../../types/componentsTypes';
import Input from './Input';

const InputContainer: React.FunctionComponent<FormControlsType> = ({
  anotherArg,
  field,
  placeholder,
  form,
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
    if (e.target.value === '') {
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

  const error = getErrorText(field.name, form.errors);

  return (
    <Input
      name={field.name}
      placeholder={placeholder}
      type={anotherArg.type !== undefined ? anotherArg.type : 'text'}
      value={field.value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={field.onChange}
      error={error !== undefined ? error : null}
    />
  );
};

export default InputContainer;
