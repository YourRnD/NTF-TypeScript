import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { IBusinessValidateError } from '../../../common/validate';
import { IUploadImage } from '../../../types/commonReducerTypes';
import ContainerField from '../../common/FormControls';
import Input from '../../common/FormControls/Input';
import UploadFile from '../../common/FormControls/UploadFile';
import Style from './FormEditBusiness.module.css';

interface IInitialValue {
  name: string;
  image: Array<IUploadImage> | null;
}

type PropsType = {
  status: string | null | undefined;
  onSubmit: (values: FormikValues) => void;
  fileNames: Array<string>;
  initialValue: IInitialValue;
  validate: ((values: FormikValues) => IBusinessValidateError) | undefined;
};

const FormEditBusiness: React.FC<PropsType> = ({
  status,
  onSubmit,
  fileNames,
  initialValue,
  validate,
}) => (
  <div className={Style.root}>
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
            placeholder="Name"
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
              id: `business-upload-image-${index}`,
              maxElem: 1,
            }}
          />
        ))}
        <button type="submit" className={Style.submit}>
          {status === 'admin' ? 'Create new business' : 'Edit business'}
        </button>
      </Form>
    </Formik>
  </div>
);

export default FormEditBusiness;
