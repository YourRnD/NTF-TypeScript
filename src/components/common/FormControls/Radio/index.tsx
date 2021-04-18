import React from 'react';
import { FormControlsType } from '../../../../types/componentsTypes';
import Radio from './Radio';

const InputContainer: React.FunctionComponent<FormControlsType> = ({
  anotherArg,
  field,
  placeholder,
  form,
}) => {
  console.log(field);
  return (
    <Radio
      name={field.name}
      placeholder={placeholder}
      valuesArray={anotherArg.valuesArray}
      selectedValue={field.value}
      onChange={field.onChange}
      error={form.errors[`${field.name}`] ? form.errors[`${field.name}`] : null}
    />
  );
};

export default InputContainer;
