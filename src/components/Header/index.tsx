import React from 'react';
import { connect } from 'react-redux';
import { setUserAction } from '../../redux/actions/authAction';
import { RootState } from '../../redux/reducers';
import { IUser } from '../../types/authReducerTypes';
import Header from './Header';

type MapDispatchPropsType = {
  setUser: (user: IUser, isAuth: boolean) => void;
};

type PropsType = MapDispatchPropsType;

const HeaderContainer: React.FC<PropsType> = ({ setUser }) => {
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

  return <Header exist={exist} />;
};

export default connect<{}, MapDispatchPropsType, {}, RootState>(null, {
  setUser: setUserAction,
})(HeaderContainer);
