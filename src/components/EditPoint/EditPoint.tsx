import React from 'react';
import { NavLink } from 'react-router-dom';
import FormEditPoint from './FormEditPoint';
import Style from './EditPoint.module.css';

type PropsType = {
  pointId: number;
  type: 'edit' | 'create' | null;
  name: string | undefined;
  address: string | undefined;
};

const EditPoint: React.FC<PropsType> = ({ pointId, type, name, address }) => (
  <div className={Style.root}>
    <div className={Style.container}>
      <h1 className={Style.title}>
        {type === 'create'
          ? 'Create new object'
          : type === 'edit'
          ? 'Edit object'
          : null}
      </h1>
      <FormEditPoint
        name={name}
        address={address}
        pointId={pointId}
        type={type}
      />
      <NavLink
        to="/table-points"
        className={Style['close-btn']}
        aria-label="Edit profile"
      />
    </div>
  </div>
);

export default EditPoint;
