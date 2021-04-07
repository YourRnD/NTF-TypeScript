import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { IAuthFormInitialValues } from '../../types/componentsTypes';
import createField from '../common/FormControls';
import Input from '../common/FormControls/Input';

type PropsType = {
  typeOperation: 'Auth' | 'Regist';
  initialValues: IAuthFormInitialValues;
  onSubmit: (values: FormikValues) => void;
};

const Auth: React.FC<PropsType> = ({ initialValues, onSubmit }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    <Form>
      {createField(Input, 'email', 'Email', {
        type: 'email',
      })}
      {createField(Input, 'name', 'Name', {
        type: 'name',
      })}
      {createField(Input, 'password', 'Password', {
        type: 'password',
      })}
      <button type="submit">Кнопочка</button>
    </Form>
  </Formik>
);

export default Auth;
