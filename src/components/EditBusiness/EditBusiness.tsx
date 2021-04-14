import React from 'react';
import { NavLink } from 'react-router-dom';
import FormEditBusiness from './FormEditBusiness';
import Style from './EditBusiness.module.css';

type PropsType = {
  status: string | null | undefined;
};

const EditBusiness: React.FC<PropsType> = ({ status }) => (
  <div className={Style.root}>
    <div className={Style.container}>
      <h1 className={Style.title}>
        {status === 'admin' ? 'Create new business' : 'Edit business'}
        {console.log(status)}
      </h1>
      <FormEditBusiness />
      <NavLink
        to="/"
        className={Style['close-btn']}
        aria-label="Edit profile"
      />
    </div>
  </div>
);

export default EditBusiness;
