import React from 'react';
import { connect } from 'react-redux';
import { FormikValues } from 'formik';
import FormEditFeedback from './FormEditFeedback';
import { RootState } from '../../../redux/reducers';
import { createFeedbackTh } from '../../../redux/actions/feedbackAction';
import { createFeedbackSchema } from '../../../common/validate';

type MapDispatchPropsType = {
  createFeedback: (
    rating: '1' | '2' | '3' | '4' | '5',
    notes: string,
    idPoint: number
  ) => void;
};

type OwnPropsType = {
  pointId: number;
  type: 'edit' | 'create' | null;
};

type PropsType = MapDispatchPropsType & OwnPropsType;

const FormEditFeedbackContainer: React.FC<PropsType> = ({
  createFeedback,
  pointId,
  type,
}) => {
  const onSubmit = (values: FormikValues): void => {
    if (type === 'edit') {
      return;
    } else if (type === 'create') {
      return createFeedback(values.rating, values.notes, pointId);
    }

    return;
  };

  const initialValues: {
    rating: '1' | '2' | '3' | '4' | '5';
    notes: string;
  } = {
    rating: '1',
    notes: '',
  };

  return (
    <FormEditFeedback
      onSubmit={onSubmit}
      initialValues={initialValues}
      validateSchema={type === 'create' ? createFeedbackSchema : {}}
      type={type}
    />
  );
};

export default connect<{}, MapDispatchPropsType, OwnPropsType, RootState>(
  null,
  {
    createFeedback: createFeedbackTh,
  }
)(FormEditFeedbackContainer);
