import { FormikValues } from 'formik';
import * as yup from 'yup';
import {
  IFormControlsErrors,
  IImageValidateError,
} from '../types/componentsTypes';
import { getKeyValue } from './getKeyValue';

export const signUpSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^[a-zA-Z\s]*$/, 'Name is incorrect!')
    .required('Required!'),
  email: yup
    .string()
    .max(50, 'Too long!')
    .email('Invalid email')
    .required('Required!'),
  password: yup
    .string()
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .matches(
      /^(?=.*[0-9])(?=.*[\\`~!@#$%^&*()=_/\-/+{};|:,.<>/?[\]'"])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\\`~!@#$%^&*()=_/\-/+{};|:,.<>/?[\]'"]*$/i,
      'The password must contain numbers, special characters (`~!@#$%^&*()-=_+[]{}\\|;’:”,.<>/? ), lowercase and uppercase Latin letters!'
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
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .matches(
      /^(?=.*[0-9])(?=.*[\\`~!@#$%^&*()=_/\-/+{};|:,.<>/?[\]'"])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\\`~!@#$%^&*()=_/\-/+{};|:,.<>/?[\]'"]*$/i,
      'The password must contain numbers, special characters (`~!@#$%^&*()-=_+[]{}\\|;’:”,.<>/? ), lowercase and uppercase Latin letters!'
    )
    .required('Required!'),
});

export interface IBusinessValidateError {
  image?: Array<IImageValidateError>;
  name?: string;
}

export const createBusinessValidate = (
  values: FormikValues
): IBusinessValidateError => {
  const errors: IBusinessValidateError = {};
  // image
  if (
    values.image !== undefined &&
    values.image !== null &&
    values.image[0].name !== ''
  ) {
    /*
    const image = values.image[0];
    if (image.type === undefined) {
      errors.image = [
        {
          id: image.id !== '' ? image.id : 'image',
          message: 'Required',
        },
      ];
    } else {
      image.type.search(/jpeg|jpg|png/i) === -1
        ? (errors.image = [
            {
              id: image.id !== '' ? image.id : 'image',
              message:
                'The file can only have the resolution of the jpeg, jpg, png format',
            },
          ])
        : null;
    }
    */
  } else {
    errors.image = [
      {
        id: 'image',
        message: 'Required',
      },
    ];
  }

  // name
  if (values.name !== undefined && values.name !== '') {
    const name = values.name;
    typeof name !== 'string'
      ? (errors.name = 'The name field can only be a string')
      : null;
    name.length <= 2 ? (errors.name = 'Too short!') : null;
    name.length > 50 ? (errors.name = 'Too long!') : null;
    name.search(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/) === -1
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

  /*

  // image
  if (
    values.image !== undefined &&
    values.image !== null &&
    values.image[0].name !== ''
  ) {
    const image = values.image[0];
    if (image.type === undefined) {
      errors.image = [
        {
          id: image.id !== '' ? image.id : 'image',
          message: 'Required',
        },
      ];
    } else {
      image.type.search(/jpeg|jpg|png/i) === -1
        ? (errors.image = [
            {
              id: image.id !== '' ? image.id : 'image',
              message:
                'The file can only have the resolution of the jpeg, jpg, png format',
            },
          ])
        : null;
    }
  }

  */

  // name
  if (values.name !== undefined && values.name !== '') {
    const name = values.name;
    typeof name !== 'string'
      ? (errors.name = 'The name field can only be a string')
      : null;
    name.length <= 2 ? (errors.name = 'Too short!') : null;
    name.length > 50 ? (errors.name = 'Too long!') : null;
    name.search(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/) === -1
      ? (errors.name = 'Name is incorrect!')
      : null;
  }

  return errors;
};

export interface IFeedbackValidateError {
  image?: Array<IImageValidateError>;
  feedback?: string;
  rating?: string;
}

export const createFeedbackValidate = (
  values: FormikValues
): IFeedbackValidateError => {
  const errors: IFeedbackValidateError = {};
  // image
  if (
    values.image !== undefined &&
    values.image !== null &&
    values.image.length !== 0 &&
    !(values.image.length === 1 && values.image[0].name === '')
  ) {
    /*
    const image = values.image;
    image.forEach((element: IUploadImage) => {
      if (
        element.type === undefined ||
        (element.type === '' && element.name.length === 0)
      ) {
        Array.isArray(errors.image)
          ? errors.image.push({
              id: element.id !== '' ? element.id : 'image',
              message: 'Required',
            })
          : (errors.image = [
              {
                id: element.id !== '' ? element.id : 'image',
                message: 'Required',
              },
            ]);
      } else {
        element.type.search(/jpeg|jpg|png/i) === -1
          ? Array.isArray(errors.image)
            ? errors.image.push({
                id: element.id !== '' ? element.id : 'image',
                message:
                  'The file can only have the resolution of the jpeg, jpg, png format',
              })
            : (errors.image = [
                {
                  id: element.id !== '' ? element.id : 'image',
                  message:
                    'The file can only have the resolution of the jpeg, jpg, png format',
                },
              ])
          : null;
        element.size / 1000000 > 5
          ? Array.isArray(errors.image)
            ? errors.image.push({
                id: element.id !== '' ? element.id : 'image',
                message: 'The file is too large!',
              })
            : (errors.image = [
                {
                  id: element.id !== '' ? element.id : 'image',
                  message: 'The file is too large!',
                },
              ])
          : null;
      }
    });
    */
  }

  // feedback
  if (values.feedback !== undefined && values.feedback !== '') {
    const feedback = values.feedback;
    typeof feedback !== 'string'
      ? (errors.feedback = 'The feedback field can only be a string')
      : null;
    feedback.length <= 2 ? (errors.feedback = 'Too short!') : null;
    feedback.length > 1000 ? (errors.feedback = 'Too long!') : null;
    feedback.search(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/) === -1
      ? (errors.feedback = 'Feedback is incorrect!')
      : null;
  }

  // rating
  if (values.rating !== undefined && values.rating !== '') {
    const rating = values.rating;
    typeof rating !== 'string'
      ? (errors.rating = 'The feedback field can only be a string')
      : null;
    rating.search(/[1-5]{1,1}/i) === -1
      ? (errors.feedback = 'Feedback is incorrect!')
      : null;
  } else {
    errors.rating = 'Required';
  }

  return errors;
};

export const updateFeedbackValidate = (
  values: FormikValues
): IFeedbackValidateError => {
  const errors: IFeedbackValidateError = {};
  // image
  if (
    values.image !== undefined &&
    values.image !== null &&
    values.image.length !== 0 &&
    !(values.image.length === 1 && values.image[0].name === '')
  ) {
    /*
    const image = values.image;
    image.forEach((element: IUploadImage) => {
      if (element.type === undefined) {
        Array.isArray(errors.image)
          ? errors.image.push({
              id: element.id !== '' ? element.id : 'image',
              message: 'Required',
            })
          : (errors.image = [
              {
                id: element.id !== '' ? element.id : 'image',
                message: 'Required',
              },
            ]);
      } else {
        element.type.search(/jpeg|jpg|png/i) === -1
          ? Array.isArray(errors.image)
            ? errors.image.push({
                id: element.id !== '' ? element.id : 'image',
                message:
                  'The file can only have the resolution of the jpeg, jpg, png format',
              })
            : (errors.image = [
                {
                  id: element.id !== '' ? element.id : 'image',
                  message:
                    'The file can only have the resolution of the jpeg, jpg, png format',
                },
              ])
          : null;
      }
    });
    */
  }

  // feedback
  if (values.feedback !== undefined && values.feedback !== '') {
    const feedback = values.feedback;
    typeof feedback !== 'string'
      ? (errors.feedback = 'The feedback field can only be a string')
      : null;
    feedback.length <= 2 ? (errors.feedback = 'Too short!') : null;
    feedback.length > 1000 ? (errors.feedback = 'Too long!') : null;
    feedback.search(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/) === -1
      ? (errors.feedback = 'Feedback is incorrect!')
      : null;
  }

  // rating
  if (values.rating !== undefined && values.rating !== '') {
    const rating = values.rating;
    typeof rating !== 'string'
      ? (errors.rating = 'The feedback field can only be a string')
      : null;
    rating.search(/[1-5]{1,1}/i) === -1
      ? (errors.feedback = 'Feedback is incorrect!')
      : null;
  }

  return errors;
};

export const createPointSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/, 'Name is incorrect!')
    .required('Required!'),
  address: yup
    .string()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .matches(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/, 'Address is incorrect!')
    .required('Required!'),
});

export const updatePointSchema = yup.object({
  name: yup
    .string()
    .default(null)
    .nullable()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/, 'Name is incorrect!!!'),
  address: yup
    .string()
    .default(null)
    .nullable()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .matches(/^[a-zA-ZА-Яа-я№()#&:.,\s\d_-]*$/, 'Address is incorrect!'),
});

export const getErrorText = (
  name: string,
  errors: IFormControlsErrors
): string | undefined => {
  if (
    typeof name === 'string' &&
    typeof errors === 'object' &&
    Object.prototype.hasOwnProperty.call(errors, name)
  ) {
    const value = getKeyValue<keyof IFormControlsErrors, IFormControlsErrors>(
      `${name}`
    )(errors);
    return typeof value === 'string' ? value : '';
  }
};
