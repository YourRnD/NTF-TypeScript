import React from 'react';
import Logo from './Logo';
import NavMenu from './NavMenu';
import BurgerMenu from './BurgerMenu';
import Style from './Header.module.css';

type PropsType = {
  exist: () => void;
  redirectToRegist: () => void;
  redirectToLogin: () => void;
  isAuth: boolean;
};

const Header: React.FC<PropsType> = ({
  exist,
  redirectToLogin,
  redirectToRegist,
  isAuth,
}) => (
  <header className={Style.root}>
    <div className={Style.container}>
      <div className={Style['left-col']}>
        <Logo />
      </div>
      <div className={Style['right-col']}>
        {isAuth ? (
          <>
            <div className={Style.pc}>
              <NavMenu />
              <button
                type="button"
                onClick={exist}
                className={`${Style.btn} ${Style['btn_first-child']}`}
              >
                Exit
              </button>
            </div>
            <div className={Style.mobile}>
              <BurgerMenu
                exist={exist}
                redirectToLogin={redirectToLogin}
                redirectToRegist={redirectToRegist}
              />
            </div>
          </>
        ) : (
          <>
            <div className={Style.pc}>
              <button
                type="button"
                onClick={redirectToLogin}
                className={`${Style.btn} ${Style['btn_first-child']}`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={redirectToRegist}
                className={Style.btn}
              >
                Sign up
              </button>
            </div>
            <div className={Style.mobile}>
              <BurgerMenu
                exist={exist}
                redirectToLogin={redirectToLogin}
                redirectToRegist={redirectToRegist}
              />
            </div>
          </>
        )}
      </div>
    </div>
  </header>
);

export default Header;
