import React from 'react';
import Logo from './Logo';
import NavMenu from './NavMenu';
import BurgerMenu from './BurgerMenu';
import Style from './Header.module.css';

type PropsType = {
  exist: () => void;
};

const Header: React.FC<PropsType> = ({ exist }) => (
  <header className={Style.root}>
    <div className={Style.container}>
      <div className={Style['left-col']}>
        <Logo />
      </div>
      <div className={Style['right-col']}>
        <div className={Style.pc}>
          <NavMenu />
          <button type="button" onClick={exist} className={Style.btn}>
            Exit
          </button>
        </div>
        <div className={Style.mobile}>
          <BurgerMenu exist={exist} />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
