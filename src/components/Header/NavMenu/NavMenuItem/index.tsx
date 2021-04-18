import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './NavMenuItem.module.css';

type PropsType = {
  route: string;
  text: string;
};

const NavbarItem: React.FC<PropsType> = ({ route, text }) => (
  <div className={Style.root}>
    <NavLink to={route} className={Style.link}>
      {text}
    </NavLink>
  </div>
);

export default NavbarItem;
