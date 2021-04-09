import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { signUpSchema } from '../../common/validate';
import ContainerField from '../common/FormControls';
import Input from '../common/FormControls/Input';

type PropsType = {
  typeOperation: 'Auth' | 'Regist';
  onSubmit: (values: FormikValues) => void;
};

const Auth: React.FC<PropsType> = ({ onSubmit, typeOperation }) => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      password: '',
    }}
    onSubmit={onSubmit}
    validationSchema={signUpSchema}
  >
    <Form>
      {typeOperation === 'Regist' ? (
        <ContainerField
          component={Input}
          name="name"
          placeholder="Name"
          props={{
            type: 'text',
          }}
        />
      ) : null}
      {
        <ContainerField
          component={Input}
          name="email"
          placeholder="Email"
          props={{
            type: 'email',
          }}
        />
      }
      {
        <ContainerField
          component={Input}
          name="password"
          placeholder="Password"
          props={{
            type: 'password',
          }}
        />
      }
      <button type="submit">Кнопочка</button>
    </Form>
  </Formik>
);

export default Auth;
