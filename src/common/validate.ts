import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^([a-zA-Z]\s*)+/i, 'Name is incorrect!')
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
