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

export const createBusinessSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Name is incorrect!')
    .required('Required!'),
});

export const updateBusinessSchema = yup.object({
  name: yup
    .string()
    .default(null)
    .nullable()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^([a-zA-ZА-Яа-я]\s*)+/i, 'Name is incorrect!'),
});

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
