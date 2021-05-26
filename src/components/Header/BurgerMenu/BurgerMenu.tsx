import React from 'react';
import NavMenuItem from '../NavMenu/NavMenuItem';
import Style from './BurgerMenu.module.css';

type PropsType = {
  exist: () => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  hideMenu: (e: React.MouseEvent<HTMLSpanElement>) => void;
  isAuth: boolean;
  redirectToRegist: () => void;
  redirectToLogin: () => void;
};

const BurgerMenu: React.FC<PropsType> = ({
  onClick,
  exist,
  hideMenu,
  isAuth,
  redirectToLogin,
  redirectToRegist,
}) => (
  <div className={Style.root}>
    <div className={Style.header} onClick={onClick}>
      <span> </span>
    </div>
    <nav className={Style.nav} onClick={hideMenu}>
      {isAuth ? (
        <>
          <ul className={Style.menu}>
            <li className={Style.item}>
              <NavMenuItem route="/home" text="Home" />
            </li>
            <li className={Style.item}>
              <NavMenuItem route="/table-points" text="My objects" />
            </li>
            <li className={Style.item}>
              <NavMenuItem route="/edit-business" text="Edit business" />
            </li>
          </ul>
        </>
      ) : (
        <ul className={Style.menu}></ul>
      )}

      {isAuth ? (
        <button type="button" onClick={exist} className={Style.btn}>
          Exit
        </button>
      ) : (
        <>
          <button type="button" onClick={redirectToLogin} className={Style.btn}>
            Sign in
          </button>
          <button
            type="button"
            onClick={redirectToRegist}
            className={Style.btn}
          >
            Sign up
          </button>
        </>
      )}
    </nav>
  </div>
);

export default BurgerMenu;
