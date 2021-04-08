import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import {
  setPasswordValueAction,
  setEmailValueAction,
  setNameValueAction,
  setUserAction,
  signupTh,
} from '../../redux/actions/authAction';
import { RootState } from '../../redux/reducers';
import { IUser, IValues } from '../../types/authReducerTypes';
import { IAuthFormInitialValues } from '../../types/componentsTypes';
import Auth from './Auth';

type MapStatePropsType = {
  isAuth: boolean;
  values: IValues;
};

type MapDispatchPropsType = {
  setUser: (user: IUser, isAuth: boolean) => void;
  setNameValue: (name: string) => void;
  setEmailValue: (email: string) => void;
  setPasswordValue: (password: string) => void;
  signup: (name: string, email: string, password: string) => void;
};

type OwnPropsType = {
  typeOperation: 'Auth' | 'Regist';
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const AuthContainer: React.FC<PropsType> = ({
  isAuth,
  typeOperation,
  values,
  setNameValue,
  setEmailValue,
  setPasswordValue,
  signup,
}) => {
  if (isAuth) {
    return <Redirect to="/" />;
  }

  const initialValues: IAuthFormInitialValues = {
    ...values,
  };

  const onSubmit = () => {
    if (typeOperation === 'Auth') {
      console.log('Соре');
    } else if (typeOperation === 'Regist') {
      signup(values.name, values.email, values.password);
    }
  };

  return (
    <Auth
      typeOperation={typeOperation}
      initialValues={initialValues}
      onSubmit={onSubmit}
      values={values}
      setNameValue={setNameValue}
      setEmailValue={setEmailValue}
      setPasswordValue={setPasswordValue}
    />
  );
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  values: state.auth.values,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapToStateProps,
    {
      setUser: setUserAction,
      setNameValue: setNameValueAction,
      setEmailValue: setEmailValueAction,
      setPasswordValue: setPasswordValueAction,
      signup: signupTh,
    }
  )
)(AuthContainer);
