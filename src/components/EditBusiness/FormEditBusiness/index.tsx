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
  uploadImage: IUploadImage;
};

type MapDispatchPropsType = {
  createBusiness: (name: string, image: string | ArrayBuffer) => void;
  updateBusiness: (id: number, obj: IUpdateBusinessObj) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const FormEditBusinessContainer: React.FC<PropsType> = ({
  updateBusiness,
  businessId,
  createBusiness,
  status,
  uploadImage,
}) => {
  const onSubmit = (values: FormikValues): void => {
    if (status === 'manager') {
      const obj: IUpdateBusinessObj = {};

      if (values.name !== '') {
        obj.name = values.name;
      }

      console.log(uploadImage);

      if (uploadImage.imageInBase64 !== '') {
        obj.image = uploadImage.imageInBase64;
      }

      if (businessId === null || businessId === undefined) {
        return;
      }

      return updateBusiness(businessId, obj);
    }

    if (status === 'admin') {
      if (values.name === null || uploadImage.imageInBase64 === null) {
        return;
      }

      return createBusiness(values.name, uploadImage.imageInBase64);
    }
  };

  const initialValue = { name: '', image: uploadImage.imageInBase64 };

  return (
    <FormEditBusiness
      status={status}
      onSubmit={onSubmit}
      fileName={uploadImage.name}
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
  uploadImage: state.common.uploadImage,
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
  mapStateToProps,
  {
    createBusiness: createBusinessTh,
    updateBusiness: updateBusinessTh,
  }
)(FormEditBusinessContainer);
