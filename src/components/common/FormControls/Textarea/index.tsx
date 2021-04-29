import React from 'react';
import { FormControlsType } from '../../../../types/componentsTypes';
import Textarea from './Textarea';

const TextareaContainer: React.FunctionComponent<FormControlsType> = ({
  field,
  placeholder,
  form,
}) => {
  return (
    <Textarea
      name={field.name}
      placeholder={placeholder}
      onChange={field.onChange}
      error={form.errors[`${field.name}`] ? form.errors[`${field.name}`] : null}
    />
  );
};

export default TextareaContainer;
