import React from 'react';
import { NavLink } from 'react-router-dom';
import FormEditPoint from './FormEditPoint';
import Style from './EditFeedback.module.css';

type PropsType = {
  pointId: number;
  type: 'edit' | 'create' | null;
};

const EditFeedback: React.FC<PropsType> = ({ pointId, type }) => (
  <div className={Style.root}>
    <div className={Style.container}>
      <h1 className={Style.title}>
        {type === 'create'
          ? 'Create new feedback'
          : type === 'edit'
          ? 'Edit feedback'
          : null}
      </h1>
      <FormEditPoint pointId={pointId} type={type} />
      <NavLink
        to="/table-points"
        className={Style['close-btn']}
        aria-label="Edit feedback"
      />
    </div>
  </div>
);

export default EditFeedback;
