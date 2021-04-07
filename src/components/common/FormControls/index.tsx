import { Field } from 'formik';
import React, { ReactNode } from 'react';
import {
  FormControlsType,
  IFieldAdditionallyProps,
} from '../../../types/componentsTypes';

const createField = (
  component: React.FC<FormControlsType>,
  name: string,
  placeholder: string,
  setStateValue: (value: string) => void,
  value: string,
  props: IFieldAdditionallyProps
): ReactNode => (
  <>
    <Field
      component={component}
      name={name}
      placeholder={placeholder}
      setStateValue={setStateValue}
      value={value}
      {...props}
    />
  </>
);

export default createField;
