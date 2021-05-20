import React from 'react';
import FormEditFeedback from './FormEditFeedback';
import Style from './EditFeedback.module.css';
import { ISelectedPoint } from '../../types/pointReducerTypes';

type PropsType = {
  pointId: number;
  type: 'edit' | 'create' | null;
  point: ISelectedPoint;
};

const EditFeedback: React.FC<PropsType> = ({ pointId, type, point }) => (
  <div className={Style.root}>
    <div className={Style.container}>
      <div className={Style['info-container']}>
        <div className={Style['left-col']}>
          <h6 className={Style.info}>
            <span className={Style['category-name']}>Name: </span>
            {point.businessName}
          </h6>
          <h6 className={Style.info}>
            <span className={Style['category-name']}>Adress: </span>
            {point.address}
          </h6>
          <h6 className={Style.info}>
            <span className={Style['category-name']}>Object name: </span>
            {point.name}
          </h6>
        </div>
        <div className={Style['right-col']}>
          <img src={point?.path ? point.path : ''} alt="Business logo" />
        </div>
      </div>
      <FormEditFeedback pointId={pointId} type={type} />
    </div>
  </div>
);

export default EditFeedback;
