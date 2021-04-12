import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { signInSchema, signUpSchema } from '../../common/validate';
import ContainerField from '../common/FormControls';
import Input from '../common/FormControls/Input';
import Style from './Auth.module.css';

interface IInitialValue {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

type PropsType = {
  typeOperation: 'Auth' | 'Regist';
  onSubmit: (values: FormikValues) => void;
  validateSchema: typeof signUpSchema | typeof signInSchema | null;
  initialValue: IInitialValue | {};
};

const Auth: React.FC<PropsType> = ({
  onSubmit,
  typeOperation,
  validateSchema,
  initialValue,
}) => (
  <div className={Style.root}>
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
      className={Style['root-container']}
    >
      <Form className={Style.form}>
        <div className={Style['redirect-container']}>
          {typeOperation == 'Regist' ? (
            <>
              <NavLink
                className={`${Style['redirect-btn']} ${Style['redirect-btn_reverce-theme']}`}
                to="/signin"
              >
                Sign in
              </NavLink>
              <h3 className={Style['choose-btn']}>Sign up</h3>
            </>
          ) : typeOperation == 'Auth' ? (
            <>
              <h3 className={Style['choose-btn']}>Sign in</h3>
              <NavLink className={Style['redirect-btn']} to="/signup">
                Sign up
              </NavLink>
            </>
          ) : null}
        </div>
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
        {typeOperation === 'Regist' ? (
          <ContainerField
            component={Input}
            name="confirmPassword"
            placeholder="Confirm Password"
            props={{
              type: 'password',
            }}
          />
        ) : null}
        <button type="submit" className={Style.submit}>
          {typeOperation == 'Auth'
            ? 'Sign in'
            : typeOperation == 'Regist'
            ? 'Sign up'
            : null}
        </button>
      </Form>
    </Formik>
  </div>
);

export default Auth;
