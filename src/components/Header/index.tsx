import React from 'react';
import { connect } from 'react-redux';
import { setTypeOpAction, setUserAction } from '../../redux/actions/authAction';
import { RootState } from '../../redux/reducers';
import { IUser } from '../../types/authReducerTypes';
import Header from './Header';

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {
  setUser: (user: IUser, isAuth: boolean) => void;
  setTypeOperation: (typeOperation: 'Regist' | 'Login' | 'Hide') => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const HeaderContainer: React.FC<PropsType> = ({
  setUser,
  setTypeOperation,
  isAuth,
}) => {
  const exist = () => {
    setUser(
      {
        id: null,
        email: null,
        name: null,
        status: null,
        idBusiness: null,
      },
      false
    );
    localStorage.removeItem('star_it_access_token');
    localStorage.removeItem('star_it_refresh_token');
  };

  const redirectToRegist = () => {
    setTypeOperation('Regist');
  };

  const redirectToLogin = () => {
    setTypeOperation('Login');
  };

  return (
    <Header
      exist={exist}
      redirectToRegist={redirectToRegist}
      redirectToLogin={redirectToLogin}
      isAuth={isAuth}
    />
  );
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
  mapToStateProps,
  {
    setUser: setUserAction,
    setTypeOperation: setTypeOpAction,
  }
)(HeaderContainer);
