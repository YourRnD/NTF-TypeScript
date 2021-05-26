import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import BurgerMenu from './BurgerMenu';
import Style from './BurgerMenu.module.css';

type MapStatePropsType = {
  isAuth: boolean;
};

type OwnPropsType = {
  exist: () => void;
  redirectToRegist: () => void;
  redirectToLogin: () => void;
};

type PropsType = MapStatePropsType & OwnPropsType;

const BurgerMenuContainer: React.FC<PropsType> = ({
  exist,
  redirectToRegist,
  redirectToLogin,
  isAuth,
}) => {
  const onClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e?.currentTarget.classList.toggle(Style['open-menu']);
    const parent = e?.currentTarget?.parentNode
      ? e.currentTarget.parentNode
      : null;
    if (parent !== null) {
      parent?.querySelector(`.${Style.nav}`)?.classList.toggle(Style.active);
    }
    return;
  };

  const hideMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.classList.toggle(Style.active);
    const parent = e?.currentTarget?.parentNode
      ? e.currentTarget.parentNode
      : null;
    if (parent !== null) {
      parent
        ?.querySelector(`.${Style.header}`)
        ?.classList.toggle(Style['open-menu']);
    }
    return;
  };

  return (
    <>
      <BurgerMenu
        isAuth={isAuth}
        exist={exist}
        onClick={onClick}
        hideMenu={hideMenu}
        redirectToRegist={redirectToRegist}
        redirectToLogin={redirectToLogin}
      />
    </>
  );
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
});

export default connect<MapStatePropsType, {}, {}, RootState>(
  mapToStateProps,
  {}
)(BurgerMenuContainer);
