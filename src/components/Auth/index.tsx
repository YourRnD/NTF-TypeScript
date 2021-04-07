import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import { setUserAction } from '../../redux/actions/authAction';
import { RootState } from '../../redux/reducers';
import { IUser } from '../../redux/types';

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {
  setUser: (user: IUser, isAuth: boolean) => void;
};

type OwnPropsType = {
  typeOperation: 'Auth' | 'Regist';
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const AuthContainer: React.FC<PropsType> = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="root">
      <p>Test text</p>
    </div>
  );
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapToStateProps,
    {
      setUser: setUserAction,
    }
  )
)(AuthContainer);
