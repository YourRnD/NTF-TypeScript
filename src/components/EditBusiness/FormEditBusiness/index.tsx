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
  createBusinessValidate,
  updateBusinessValidate,
} from '../../../common/validate';
import { compose } from 'redux';

type MapStatePropsType = {
  businessId: number | null | undefined;
  status: string | null | undefined;
  uploadImages: Array<IUploadImage> | null;
  countImages: number;
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
  countImages,
}) => {
  const onSubmit = (values: FormikValues): void => {
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
      console.log(values);

      if (values.name === null || uploadImages === null) {
        return;
      }

      return createBusiness(
        values.name,
        uploadImages.map((item) => item.imageInBase64)
      );
    }
  };

  const initialValue = {
    name: '',
    image: uploadImages,
  };

  const fileNames = [''];

  if (uploadImages !== null) {
    fileNames[0] = uploadImages[0].name;
    for (let i = 1; i < countImages; i++) {
      fileNames.push(uploadImages[i].name);
    }
  }

  return (
    <FormEditBusiness
      status={status}
      onSubmit={onSubmit}
      fileNames={fileNames}
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
  countImages: state.common.countImages,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(
    mapStateToProps,
    {
      createBusiness: createBusinessTh,
      updateBusiness: updateBusinessTh,
    }
  )
)(FormEditBusinessContainer);
