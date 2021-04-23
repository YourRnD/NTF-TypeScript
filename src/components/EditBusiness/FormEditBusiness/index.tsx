import React from 'react';
import { connect } from 'react-redux';
import { FormikValues } from 'formik';
import FormEditBusiness from './FormEditBusiness';
import { RootState } from '../../../redux/reducers';
import { IUploadImage } from '../../../types/commonReducerTypes';
import {
  createBusinessTh,
  updateBusinessTh,
} from '../../../redux/actions/businessAction';
import { IUpdateBusinessObj } from '../../../types/businessReducerTypes';
import {
  createBusinessSchema,
  updateBusinessSchema,
} from '../../../common/validate';

type MapStatePropsType = {
  businessId: number | null | undefined;
  status: string | null | undefined;
  uploadImages: Array<IUploadImage> | null;
};

type MapDispatchPropsType = {
  createBusiness: (name: string, image: Array<string | ArrayBuffer>) => void;
  updateBusiness: (id: number, obj: IUpdateBusinessObj) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const FormEditBusinessContainer: React.FC<PropsType> = ({
  updateBusiness,
  businessId,
  createBusiness,
  status,
  uploadImages,
}) => {
  const onSubmit = (values: FormikValues): void => {
    console.log(123);
    if (status === 'manager') {
      const obj: IUpdateBusinessObj = {};

      if (values.name !== '') {
        obj.name = values.name;
      }

      if (uploadImages !== null) {
        obj.image = uploadImages.map((item) => item.imageInBase64);
      }

      if (businessId === null || businessId === undefined) {
        return;
      }

      return updateBusiness(businessId, obj);
    }

    if (status === 'admin') {
      console.log(123);

      if (values.name === null || uploadImages === null) {
        return;
      }

      console.log(12);

      return createBusiness(
        values.name,
        uploadImages.map((item) => item.imageInBase64)
      );
    }
  };

  const initialValue = { name: '', image: '' };

  return (
    <FormEditBusiness
      status={status}
      onSubmit={onSubmit}
      fileName={
        uploadImages === null ? [''] : uploadImages.map((item) => item.name)
      }
      validateSchema={
        status === 'admin'
          ? createBusinessSchema
          : status === 'manager'
          ? updateBusinessSchema
          : {}
      }
      initialValue={initialValue}
    />
  );
};

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  businessId: state.auth.user.idBusiness,
  status: state.auth.user.status,
  uploadImages: state.common.uploadImages,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
  mapStateToProps,
  {
    createBusiness: createBusinessTh,
    updateBusiness: updateBusinessTh,
  }
)(FormEditBusinessContainer);
