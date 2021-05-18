import { Field, Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { signInSchema, signUpSchema } from '../../common/validate';
import ContainerField from '../common/FormControls';
import Input from '../common/FormControls/Input';
import Style from './Auth.module.css';

interface IInitialValue {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe?: boolean;
}

type PropsType = {
  typeOperation: 'Login' | 'Regist';
  onSubmit: (values: FormikValues) => void;
  invertTypeOperation: (typeOperation: 'Login' | 'Regist') => void;
  closeForm: () => void;
  validateSchema: typeof signUpSchema | typeof signInSchema | {};
  initialValue: IInitialValue | {};
};

const Auth: React.FC<PropsType> = ({
  onSubmit,
  typeOperation,
  validateSchema,
  initialValue,
  invertTypeOperation,
  closeForm,
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
              <button
                type="button"
                className={`${Style['redirect-btn']} ${Style['redirect-btn_reverce-theme']}`}
                onClick={() => {
                  invertTypeOperation(typeOperation);
                }}
              >
                Sign in
              </button>
              <h3 className={Style['choose-btn']}>Sign up</h3>
            </>
          ) : typeOperation == 'Login' ? (
            <>
              <h3 className={Style['choose-btn']}>Sign in</h3>
              <button
                type="button"
                className={Style['redirect-btn']}
                onClick={() => {
                  invertTypeOperation(typeOperation);
                }}
              >
                Sign up
              </button>
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
          <>
            <ContainerField
              component={Input}
              name="confirmPassword"
              placeholder="Confirm Password"
              props={{
                type: 'password',
              }}
            />
          </>
        ) : null}

        {typeOperation === 'Login' ? (
          <div className={Style['checkbox-container']}>
            <label htmlFor="feedback-answer-checkbox">Remember me</label>
            <Field
              type="checkbox"
              name="rememberMe"
              placeholder="Remember me"
              id="remember-me"
            />
          </div>
        ) : null}
        <button type="submit" className={Style.submit} data-testid="submit">
          {typeOperation == 'Login'
            ? 'Sign in'
            : typeOperation == 'Regist'
            ? 'Sign up'
            : null}
        </button>
        <button type="button" className={Style.close} onClick={closeForm}>
          Continue without authorization
        </button>
      </Form>
    </Formik>
  </div>
);

export default Auth;
