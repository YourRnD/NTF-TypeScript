import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import {
  createBusinessSchema,
  updateBusinessSchema,
} from '../../../common/validate';
import ContainerField from '../../common/FormControls';
import Input from '../../common/FormControls/Input';
import UploadFile from '../../common/FormControls/UploadFile';
import Style from './FormEditBusiness.module.css';

interface IInitialValue {
  name: string;
  image: string | ArrayBuffer | null;
}

type PropsType = {
  status: string | null | undefined;
  onSubmit: (values: FormikValues) => void;
  fileName: string;
  initialValue: IInitialValue;
  validateSchema:
    | typeof createBusinessSchema
    | typeof updateBusinessSchema
    | {};
};

const FormEditBusiness: React.FC<PropsType> = ({
  status,
  onSubmit,
  fileName,
  initialValue,
  validateSchema,
}) => (
  <div className={Style.root}>
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
      className={Style['root-container']}
    >
      <Form className={Style.form}>
        {
          <ContainerField
            component={Input}
            name="name"
            placeholder="Name"
            props={{
              type: 'text',
            }}
          />
        }
        {
          <ContainerField
            component={UploadFile}
            name="business-upload-image"
            placeholder="business-upload-image"
            props={{
              fileName,
              id: 'business-upload-image',
            }}
          />
        }
        <button type="submit" className={Style.submit}>
          {status === 'admin' ? 'Create new business' : 'Edit business'}
        </button>
      </Form>
    </Formik>
  </div>
);

export default FormEditBusiness;
