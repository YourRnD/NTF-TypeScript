import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { IBusinessValidateError } from '../../../common/validate';
import { IUploadImages } from '../../../types/commonReducerTypes';
import ContainerField from '../../common/FormControls';
import Input from '../../common/FormControls/Input';
import UploadFile from '../../common/FormControls/UploadFile';
import Style from './FormEditBusiness.module.css';

interface IInitialValue {
  name: string;
  image: IUploadImages | null;
}

type PropsType = {
  status: string | null | undefined;
  onSubmit: (values: FormikValues) => void;
  initialValue: IInitialValue;
  validate: ((values: FormikValues) => IBusinessValidateError) | undefined;
};

const FormEditBusiness: React.FC<PropsType> = ({
  status,
  onSubmit,
  initialValue,
  validate,
}) => (
  <Formik
    initialValues={initialValue}
    onSubmit={onSubmit}
    validate={validate}
    className={Style['root-container']}
  >
    <Form className={Style.form}>
      {
        <ContainerField
          component={Input}
          name="name"
          placeholder="Company name"
          props={{
            type: 'text',
          }}
        />
      }
      <div className={Style.bottom}>
        <div className={Style['upload-file-container']}>
          <ContainerField
            component={UploadFile}
            name="image"
            placeholder="image"
            props={{
              maxElem: 1,
            }}
          />
        </div>
        <button type="submit" className={Style.submit}>
          {status === 'admin' ? 'Create new business' : 'Edit business'}
        </button>
      </div>
    </Form>
  </Formik>
);

export default FormEditBusiness;
