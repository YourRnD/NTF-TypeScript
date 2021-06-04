import React from 'react';
import { connect } from 'react-redux';
import { FormikValues } from 'formik';
import FormEditBusiness from './FormEditBusiness';
import { RootState } from '../../../redux/reducers';
import {
  CommonActionTypes,
  IUploadImages,
} from '../../../types/commonReducerTypes';
import {
  createBusinessTh,
  updateBusinessTh,
} from '../../../redux/actions/businessAction';
import { IUpdateBusinessObj } from '../../../types/businessReducerTypes';
import {
  createBusinessValidate,
  updateBusinessValidate,
} from '../../../common/validate';
import { compose } from 'redux';
import { setUploadImage } from '../../../redux/actions/commonAction';

type MapStatePropsType = {
  businessId: number | null | undefined;
  status: string | null | undefined;
  uploadImages: IUploadImages;
};

type MapDispatchPropsType = {
  createBusiness: (name: string, image: Array<string | ArrayBuffer>) => void;
  updateBusiness: (id: number, obj: IUpdateBusinessObj) => void;
  setUploadImage: (uploadImages: IUploadImages) => CommonActionTypes;
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
    if (status === 'manager') {
      const obj: IUpdateBusinessObj = {};

      if (values.name !== '') {
        obj.name = values.name.trim();
      }

      const images: Array<string> = [];

      for (const key in uploadImages) {
        if ({}.hasOwnProperty.call(uploadImages, key)) {
          const obj = uploadImages[key];

          if (typeof obj !== 'boolean' && obj?.imageInBase64 !== undefined) {
            images.push(`${obj.imageInBase64}`);
          }
        }
      }

      if (images.length > 0) {
        obj.image = images;
      }

      if (businessId === null || businessId === undefined) {
        return;
      }

      return updateBusiness(businessId, obj);
    }

    if (status === 'admin') {
      const images: Array<string> = [];

      for (const key in uploadImages) {
        if ({}.hasOwnProperty.call(uploadImages, key)) {
          const obj = uploadImages[key];

          if (typeof obj !== 'boolean' && obj?.imageInBase64 !== undefined) {
            images.push(`${obj.imageInBase64}`);
          }
        }
      }

      if (values.name === null || images?.length === 0) {
        return;
      }

      return createBusiness(values.name.trim(), images);
    }
  };

  const initialValue = {
    name: '',
    image: null,
  };

  return (
    <FormEditBusiness
      status={status}
      onSubmit={onSubmit}
      validate={
        status === 'admin'
          ? createBusinessValidate
          : status === 'manager'
          ? updateBusinessValidate
          : undefined
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

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
    mapStateToProps,
    {
      createBusiness: createBusinessTh,
      updateBusiness: updateBusinessTh,
      setUploadImage,
    }
  )
)(FormEditBusinessContainer);
