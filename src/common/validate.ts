import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
});
