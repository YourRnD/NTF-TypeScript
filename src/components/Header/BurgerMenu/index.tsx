import React from 'react';
import BurgerMenu from './BurgerMenu';
import Style from './BurgerMenu.module.css';

type PropsType = {
  exist: () => void;
};

const BurgerMenuContainer: React.FC<PropsType> = ({ exist }) => {
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
      <BurgerMenu exist={exist} onClick={onClick} hideMenu={hideMenu} />
    </>
  );
};

export default BurgerMenuContainer;
