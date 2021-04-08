import { Form, Formik } from 'formik';
import React from 'react';
import { IAuthFormInitialValues } from '../../types/componentsTypes';
import createField from '../common/FormControls';
import Input from '../common/FormControls/Input';

interface IValues {
  name: string;
  email: string;
  password: string;
}

type PropsType = {
  typeOperation: 'Auth' | 'Regist';
  initialValues: IAuthFormInitialValues;
  onSubmit: () => void;
  values: IValues;
  setNameValue: (value: string) => void;
  setEmailValue: (value: string) => void;
  setPasswordValue: (value: string) => void;
};

const Auth: React.FC<PropsType> = ({
  initialValues,
  onSubmit,
  typeOperation,
  values,
  setNameValue,
  setEmailValue,
  setPasswordValue,
}) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    <Form>
      {typeOperation === 'Regist'
        ? createField(Input, 'name', 'Name', setNameValue, values.name, {
            type: 'name',
          })
        : null}
      {createField(Input, 'email', 'Email', setEmailValue, values.email, {
        type: 'email',
      })}
      {createField(
        Input,
        'password',
        'Password',
        setPasswordValue,
        values.password,
        {
          type: 'password',
        }
      )}
      <button type="submit">Кнопочка</button>
    </Form>
  </Formik>
);

export default Auth;
