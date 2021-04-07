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
  props: IFieldAdditionallyProps
): ReactNode => (
  <>
    <Field
      component={component}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  </>
);

export default createField;
