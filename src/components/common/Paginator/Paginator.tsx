import React from 'react';
import Style from './Paginator.module.css';

type PropsType = {
  pages: Array<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >
  >;
};

const Paginator: React.FC<PropsType> = ({ pages }) => (
  <div className={Style.usersNav}>{pages}</div>
);

export default Paginator;
