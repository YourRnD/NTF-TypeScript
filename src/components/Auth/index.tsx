import { FormikValues } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { signInSchema, signUpSchema } from '../../common/validate';
import {
  setTypeOpAction,
  signinTh,
  signupTh,
} from '../../redux/actions/authAction';
import { RootState } from '../../redux/reducers';
import Auth from './Auth';

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {
  signup: (name: string, email: string, password: string) => void;
  signin: (email: string, password: string) => void;
  setTypeOperation: (typeOperation: 'Regist' | 'Login' | 'Hide') => void;
};

type OwnPropsType = {
  typeOperation: 'Login' | 'Regist';
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const AuthContainer: React.FC<PropsType> = ({
  isAuth,
  typeOperation,
  signup,
  signin,
  setTypeOperation,
}) => {
  if (isAuth) {
    return <Redirect to="/home" />;
  }

  const onSubmit = (values: FormikValues) => {
    if (typeOperation === 'Login') {
      localStorage.setItem('star-it-remember-me', `${!!values.rememberMe}`);
      signin(values.email, values.password);
    } else if (typeOperation === 'Regist') {
      signup(values.name, values.email, values.password);
    }
  };

  const invertTypeOperation = (typeOperation: 'Login' | 'Regist') => {
    typeOperation === 'Login'
      ? setTypeOperation('Regist')
      : typeOperation === 'Regist'
      ? setTypeOperation('Login')
      : null;
  };

  const closeForm = () => {
    localStorage.removeItem('star_it_access_token');
    localStorage.removeItem('star_it_refresh_token');
    sessionStorage.removeItem('star_it_access_token');
    sessionStorage.removeItem('star_it_refresh_token');

    setTypeOperation('Hide');
  };

  const initialValue =
    typeOperation === 'Regist'
      ? {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }
      : typeOperation === 'Login'
      ? { email: '', password: '', rememberMe: false }
      : {};

  return (
    <Auth
      typeOperation={typeOperation}
      onSubmit={onSubmit}
      validateSchema={
        typeOperation === 'Regist'
          ? signUpSchema
          : typeOperation === 'Login'
          ? signInSchema
          : {}
      }
      initialValue={initialValue}
      invertTypeOperation={invertTypeOperation}
      closeForm={closeForm}
    />
  );
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapToStateProps, {
  signup: signupTh,
  signin: signinTh,
  setTypeOperation: setTypeOpAction,
})(AuthContainer);
