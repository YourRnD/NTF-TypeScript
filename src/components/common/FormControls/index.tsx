import { Field } from 'formik';
import React from 'react';
import {
  FormControlsType,
  IFieldAdditionallyProps,
} from '../../../types/componentsTypes';

type PropsType = {
  component: React.FC<FormControlsType>;
  name: string;
  placeholder: string;
  props: IFieldAdditionallyProps;
};

const ContainerField: React.FC<PropsType> = ({
  component,
  name,
  placeholder,
  props,
}) => (
  <>
    <Field
      component={component}
      name={name}
      placeholder={placeholder}
      anotherArg={{ ...props }}
    />
  </>
);

export default ContainerField;
