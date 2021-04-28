import React from 'react';
import Style from './FormEditFeedback.module.css';
import { Form, Formik, FormikValues } from 'formik';
import { IFeedbackValidateError } from '../../../common/validate';
import ContainerField from '../../common/FormControls';
import Textarea from '../../common/FormControls/Textarea';
import Radio from '../../common/FormControls/Radio';
import UploadFile from '../../common/FormControls/UploadFile';
import { IUploadImage } from '../../../types/commonReducerTypes';

interface IInitialValues {
  rating: string;
  notes: string;
  image: Array<IUploadImage> | null;
}

type PropsType = {
  onSubmit: (values: FormikValues) => void;
  initialValues: IInitialValues;
  validate: ((values: FormikValues) => IFeedbackValidateError) | undefined;
  fileNames: Array<string>;
  type: 'edit' | 'create' | null;
};

const FormEditPoint: React.FC<PropsType> = ({
  onSubmit,
  initialValues,
  validate,
  type,
  fileNames,
}) => (
  <div className={Style.root}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      className={Style['root-container']}
    >
      <Form className={Style.form}>
        {
          <ContainerField
            component={Radio}
            name="rating"
            placeholder="Rating"
            props={{
              valuesArray: [
                {
                  value: '5',
                  id: 'feedback-radio-5',
                },
                {
                  value: '4',
                  id: 'feedback-radio-4',
                },
                {
                  value: '3',
                  id: 'feedback-radio-3',
                },
                {
                  value: '2',
                  id: 'feedback-radio-2',
                },
                {
                  value: '1',
                  id: 'feedback-radio-1',
                },
              ],
            }}
          />
        }
        {
          <ContainerField
            component={Textarea}
            name="notes"
            placeholder="Notes"
            props={{
              type: 'text',
            }}
          />
        }
        {fileNames.map((item, index) => (
          <ContainerField
            key={item}
            component={UploadFile}
            name="image"
            placeholder="image"
            props={{
              fileName: item,
              id: `feedback-upload-image-${index}`,
              maxElem: 3,
            }}
          />
        ))}
        <button type="submit" className={Style.submit}>
          {type === 'create'
            ? 'Create new feedback'
            : type === 'edit'
            ? 'Edit feedback'
            : null}
        </button>
      </Form>
    </Formik>
  </div>
);

export default FormEditPoint;
