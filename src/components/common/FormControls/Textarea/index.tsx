import React from 'react';
import { getErrorText } from '../../../../common/validate';
import { FormControlsType } from '../../../../types/componentsTypes';
import Textarea from './Textarea';

const TextareaContainer: React.FunctionComponent<FormControlsType> = ({
  field,
  placeholder,
  form,
}) => {
  const error = getErrorText(field.name, form.errors);

  return (
    <Textarea
      name={field.name}
      placeholder={placeholder}
      onChange={field.onChange}
      error={error !== undefined ? error : null}
    />
  );
};

export default TextareaContainer;
