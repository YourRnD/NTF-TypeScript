import React from 'react';
import NavMenuItem from './NavMenuItem';
import Style from './NavMenu.module.css';

const Navbar: React.FC = () => (
  <nav className={Style.root}>
    <ul className={Style.list}>
      <li className={Style['list-item']}>
        <NavMenuItem route="/home" text="Home" />
      </li>
      <li className={Style['list-item']}>
        <NavMenuItem route="/table-points" text="Point table" />
      </li>
      <li className={Style['list-item']}>
        <NavMenuItem route="/edit-business" text="Edit business" />
      </li>
    </ul>
  </nav>
);

export default Navbar;
