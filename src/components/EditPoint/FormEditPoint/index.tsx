import React from 'react';
import { connect } from 'react-redux';
import { FormikValues } from 'formik';
import FormEditPoint from './FormEditPoint';
import { RootState } from '../../../redux/reducers';
import {
  createPointTh,
  updatePointTh,
} from '../../../redux/actions/pointAction';
import { IUpdatePointsObj } from '../../../types/pointReducerTypes';
import { updatePointSchema, createPointSchema } from '../../../common/validate';

type MapStatePropsType = {
  idBusiness: number | null | undefined;
  status: string | null | undefined;
};

type MapDispatchPropsType = {
  updatePoint: (id: number, obj: IUpdatePointsObj) => void;
  createPoint: (
    name: string,
    address: string,
    businessId: number | null
  ) => void;
};

type OwnPropsType = {
  pointId: number;
  type: 'edit' | 'create' | null;
  name: string | undefined;
  address: string | undefined;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const FormEditPointContainer: React.FC<PropsType> = ({
  updatePoint,
  createPoint,
  status,
  pointId,
  type,
  name,
  address,
}) => {
  const onSubmit = (values: FormikValues): void => {
    if (status === 'manager') {
      if (type === 'edit') {
        const obj: IUpdatePointsObj = {};

        if (values.name !== '') {
          obj.name = values.name.trim();
        }

        if (values.address !== '') {
          obj.address = values.address.trim();
        }

        return updatePoint(pointId, obj);
      } else if (type === 'create') {
        return createPoint(values.name.trim(), values.address.trim(), null);
      }
    }

    return;
  };

  console.log(name);

  const initialValues = {
    name,
    address,
  };

  return (
    <FormEditPoint
      onSubmit={onSubmit}
      initialValues={initialValues}
      validateSchema={
        type === 'edit'
          ? updatePointSchema
          : type === 'create'
          ? createPointSchema
          : {}
      }
      type={type}
    />
  );
};

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  idBusiness: state.auth.user.idBusiness,
  status: state.auth.user.status,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapStateToProps, {
  createPoint: createPointTh,
  updatePoint: updatePointTh,
})(FormEditPointContainer);
