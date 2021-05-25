import React from 'react';
import { getErrorText } from '../../../../common/validate';
import { FormControlsType } from '../../../../types/componentsTypes';
import Radio from './Radio';

const InputContainer: React.FunctionComponent<FormControlsType> = ({
  anotherArg,
  field,
  placeholder,
  form,
}) => {
  const error = getErrorText(field.name, form.errors);

  return (
    <Radio
      name={field.name}
      placeholder={placeholder}
      valuesArray={anotherArg.valuesArray}
      onChange={field.onChange}
      error={error !== undefined ? error : null}
    />
  );
};

export default InputContainer;
