import { FormikValues } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import { signUpSchema } from '../../common/validate';
import { signupTh } from '../../redux/actions/authAction';
import { RootState } from '../../redux/reducers';
import Auth from './Auth';

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {
  signup: (name: string, email: string, password: string) => void;
};

type OwnPropsType = {
  typeOperation: 'Auth' | 'Regist';
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const AuthContainer: React.FC<PropsType> = ({
  isAuth,
  typeOperation,
  signup,
}) => {
  if (isAuth) {
    return <Redirect to="/" />;
  }

  const onSubmit = (values: FormikValues) => {
    if (typeOperation === 'Auth') {
      console.log('Соре');
    } else if (typeOperation === 'Regist') {
      signup(values.name, values.email, values.password);
    }
  };

  const initialValue =
    typeOperation === 'Regist'
      ? {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }
      : typeOperation === 'Auth'
      ? { email: '', password: '' }
      : {};

  return (
    <Auth
      typeOperation={typeOperation}
      onSubmit={onSubmit}
      validateSchema={signUpSchema}
      initialValue={initialValue}
    />
  );
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapToStateProps,
    {
      signup: signupTh,
    }
  )
)(AuthContainer);
