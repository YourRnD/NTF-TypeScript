import React from 'react';
import { FormControlsType } from '../../../../types/componentsTypes';
import Textarea from './Textarea';

const TextareaContainer: React.FunctionComponent<FormControlsType> = ({
  field,
  placeholder,
  form,
}) => {
  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    e.target.placeholder = '';
    const span:
      | HTMLSpanElement
      | undefined
      | null = e.target?.parentNode?.querySelector('span');
    span != undefined && span != null ? (span.style.display = 'block') : false;
  };
  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    if (e.target.value === '') {
      const span:
        | HTMLSpanElement
        | undefined
        | null = e.target?.parentNode?.querySelector('span');

      if (span != undefined && span != null) {
        const spanText: string | null = span.textContent;

        const textarea: HTMLTextAreaElement = e.target;

        spanText != undefined && spanText != null
          ? (textarea.placeholder = spanText)
          : false;

        span.style.display = 'none';
      }
    }
  };

  return (
    <Textarea
      name={field.name}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={field.onChange}
      error={form.errors[`${field.name}`] ? form.errors[`${field.name}`] : null}
    />
  );
};

export default TextareaContainer;
