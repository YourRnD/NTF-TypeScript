import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormikValues } from 'formik';
import FormEditFeedback from './FormEditFeedback';
import { RootState } from '../../../redux/reducers';
import { createFeedbackTh } from '../../../redux/actions/feedbackAction';
import { createFeedbackValidate } from '../../../common/validate';
import { IUploadImages } from '../../../types/commonReducerTypes';
import { getPointTh } from '../../../redux/actions/pointAction';
import { setUploadImage } from '../../../redux/actions/commonAction';

type MapDispatchPropsType = {
  createFeedback: (
    rating: '1' | '2' | '3' | '4' | '5',
    notes: string,
    idPoint: number,
    images: Array<string | ArrayBuffer> | null
  ) => void;
  getPoint: (id: number) => void;
  setImage: (uploadImages: IUploadImages) => void;
};

type MapStatePropsType = {
  uploadImages: IUploadImages | null;
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
  getPoint,
}) => {
  useEffect(() => {
    getPoint(pointId);
  }, [getPoint, pointId]);

  const onSubmit = (values: FormikValues): void => {
    if (type === 'edit') {
      return;
    } else if (type === 'create') {
      const images: Array<string> = [];

      for (const key in uploadImages) {
        if ({}.hasOwnProperty.call(uploadImages, key)) {
          const obj = uploadImages[key];

          if (typeof obj !== 'boolean' && obj?.imageInBase64 !== undefined) {
            images.push(`${obj.imageInBase64}`);
          }
        }
      }

      return createFeedback(
        values.rating,
        values.feedback,
        pointId,
        images.length > 0 ? images : null
      );
    }

    return;
  };

  const initialValues = {
    rating: '',
    feedback: '',
    image: uploadImages,
  };

  return (
    <FormEditFeedback
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={type === 'create' ? createFeedbackValidate : undefined}
      type={type}
    />
  );
};

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  uploadImages: state.common.uploadImages,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapStateToProps, {
  createFeedback: createFeedbackTh,
  getPoint: getPointTh,
  setImage: setUploadImage,
})(FormEditFeedbackContainer);
