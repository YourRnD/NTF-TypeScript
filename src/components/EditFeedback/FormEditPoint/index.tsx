import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormikValues } from 'formik';
import FormEditFeedback from './FormEditFeedback';
import { RootState } from '../../../redux/reducers';
import { createFeedbackTh } from '../../../redux/actions/feedbackAction';
import { createFeedbackValidate } from '../../../common/validate';
import {
  CommonActionTypes,
  IUploadImage,
} from '../../../types/commonReducerTypes';
import { setUploadImage } from '../../../redux/actions/commonAction';
import { getPointTh } from '../../../redux/actions/pointAction';

type MapDispatchPropsType = {
  createFeedback: (
    rating: '1' | '2' | '3' | '4' | '5',
    notes: string,
    idPoint: number,
    images: Array<string | ArrayBuffer> | null
  ) => void;
  setUploadImage: (
    uploadImages: Array<IUploadImage> | null,
    countImages: number
  ) => CommonActionTypes;
  getPoint: (id: number) => void;
};

type MapStatePropsType = {
  uploadImages: Array<IUploadImage> | null;
  countImages: number;
};

type OwnPropsType = {
  pointId: number;
  type: 'edit' | 'create' | null;
};

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType;

const FormEditFeedbackContainer: React.FC<PropsType> = ({
  createFeedback,
  pointId,
  type,
  uploadImages,
  countImages,
  setUploadImage,
  getPoint,
}) => {
  useEffect(() => {
    getPoint(pointId);
    setUploadImage(null, 1);
  }, [getPoint, pointId, setUploadImage]);

  const onSubmit = (values: FormikValues): void => {
    if (type === 'edit') {
      return;
    } else if (type === 'create') {
      return createFeedback(
        values.rating,
        values.feedback,
        pointId,
        uploadImages !== null
          ? uploadImages.map((item) => item.imageInBase64)
          : null
      );
    }

    return;
  };

  const initialValues = {
    rating: '',
    feedback: '',
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
    <FormEditFeedback
      onSubmit={onSubmit}
      initialValues={initialValues}
      fileNames={fileNames}
      validate={type === 'create' ? createFeedbackValidate : undefined}
      type={type}
    />
  );
};

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  uploadImages: state.common.uploadImages,
  countImages: state.common.countImages,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapStateToProps, {
  createFeedback: createFeedbackTh,
  setUploadImage,
  getPoint: getPointTh,
})(FormEditFeedbackContainer);
