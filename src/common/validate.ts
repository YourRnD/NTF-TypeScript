import { FormikValues } from 'formik';
import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Name is incorrect!')
    .required('Required!'),
  email: yup
    .string()
    .max(50, 'Too long!')
    .email('Invalid email')
    .required('Required!'),
  password: yup
    .string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&_*]{6,}/g,
      'The password must contain numbers, special characters, lowercase and uppercase Latin letters!'
    )
    .required('Required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password mismatch!')
    .required('Required!'),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .max(50, 'Too long!')
    .email('Invalid email')
    .required('Required!'),
  password: yup
    .string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&_*]{6,}/g,
      'The password must contain numbers, special characters, lowercase and uppercase Latin letters!'
    )
    .required('Required!'),
});

export interface IBusinessValidateError {
  image?: string;
  name?: string;
}

export const createBusinessValidate = (
  values: FormikValues
): IBusinessValidateError => {
  const errors: IBusinessValidateError = {};
  // image
  if (
    values.image !== undefined &&
    values.image !== '' &&
    values.image !== null
  ) {
    const image = values.image;
    if (image.type === undefined) {
      errors.image = 'Required';
    } else {
      image.type.search(/jpeg|jpg|png/i) === -1
        ? (errors.image =
            'The file can only have the resolution of the jpeg, jpg, png format')
        : null;
    }
  } else {
    errors.image = 'Required';
  }

  // name
  if (values.name !== undefined && values.name !== '') {
    const name = values.name;
    typeof name !== 'string'
      ? (errors.name = 'The name field can only be a string')
      : null;
    name.length <= 2 ? (errors.name = 'Too short!') : null;
    name.length > 50 ? (errors.name = 'Too long!') : null;
    name.search(/^([a-zA-ZА-Яа-я]\s*)+/i) === -1
      ? (errors.name = 'Name is incorrect!')
      : null;
  } else {
    errors.name = 'Required';
  }

  return errors;
};

export const updateBusinessValidate = (
  values: FormikValues
): IBusinessValidateError => {
  const errors: IBusinessValidateError = {};
  // image
  if (
    values.image !== undefined &&
    values.image !== '' &&
    values.image !== null
  ) {
    const image = values.image;
    if (image.type === undefined) {
      errors.image = 'Required';
    } else {
      image.type.search(/jpeg|jpg|png/i) === -1
        ? (errors.image =
            'The file can only have the resolution of the jpeg, jpg, png format')
        : null;
    }
  }

  // name
  if (values.name !== undefined && values.name !== '') {
    const name = values.name;
    typeof name !== 'string'
      ? (errors.name = 'The name field can only be a string')
      : null;
    name.length <= 2 ? (errors.name = 'Too short!') : null;
    name.length > 50 ? (errors.name = 'Too long!') : null;
    name.search(/^([a-zA-ZА-Яа-я]\s*)+/i) === -1
      ? (errors.name = 'Name is incorrect!')
      : null;
  }

  return errors;
};

export const createPointSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Name is incorrect!')
    .required('Required!'),
  address: yup
    .string()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Address is incorrect!')
    .required('Required!'),
});

export const updatePointSchema = yup.object({
  name: yup
    .string()
    .default(null)
    .nullable()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Name is incorrect!'),
  address: yup
    .string()
    .default(null)
    .nullable()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Address is incorrect!'),
});

export const createFeedbackSchema = yup.object().shape({
  notes: yup
    .string()
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Notes is incorrect!')
    .required('Required!'),
});
