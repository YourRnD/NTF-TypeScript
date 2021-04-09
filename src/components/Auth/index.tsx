import { FormikValues } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import { setUserAction, signupTh } from '../../redux/actions/authAction';
import { RootState } from '../../redux/reducers';
import { IUser } from '../../types/authReducerTypes';
import Auth from './Auth';

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {
  setUser: (user: IUser, isAuth: boolean) => void;
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

  return <Auth typeOperation={typeOperation} onSubmit={onSubmit} />;
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapToStateProps,
    {
      setUser: setUserAction,
      signup: signupTh,
    }
  )
)(AuthContainer);
