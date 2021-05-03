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
  <div className={Style['users-nav']}>{pages}</div>
);

export default Paginator;
