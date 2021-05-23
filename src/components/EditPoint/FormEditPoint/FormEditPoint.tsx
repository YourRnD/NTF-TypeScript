import React from 'react';
import Style from './FormEditPoint.module.css';
import { Form, Formik, FormikValues } from 'formik';
import { createPointSchema, updatePointSchema } from '../../../common/validate';
import ContainerField from '../../common/FormControls';
import Input from '../../common/FormControls/Input';

interface IInitialValues {
  name: string | undefined;
  address: string | undefined;
}

type PropsType = {
  onSubmit: (values: FormikValues) => void;
  initialValues: IInitialValues;
  validateSchema: typeof updatePointSchema | typeof createPointSchema | {};
  type: 'edit' | 'create' | null;
};

const FormEditPoint: React.FC<PropsType> = ({
  onSubmit,
  initialValues,
  validateSchema,
  type,
}) => (
  <Formik
    initialValues={initialValues}
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
          component={Input}
          name="address"
          placeholder="Address"
          props={{
            type: 'text',
          }}
        />
      }
      <button type="submit" className={Style.submit}>
        {type === 'create'
          ? 'Create new object'
          : type === 'edit'
          ? 'Edit object'
          : null}
      </button>
    </Form>
  </Formik>
);

export default FormEditPoint;
