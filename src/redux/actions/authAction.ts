import {
  SET_USER,
  SET_INIT,
  SET_NAME_VALUE,
  SET_EMAIL_VALUE,
  SET_PASSWORD_VALUE,
} from '../constants';
import { IUser, AuthActionTypes } from '../../types/authReducerTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';

export const setUserAction = (
  user: IUser,
  isAuth: boolean
): AuthActionTypes => ({
  type: SET_USER,
  payload: {
    user,
    isAuth,
  },
});

export const setInitAction = (isInit: boolean): AuthActionTypes => ({
  type: SET_INIT,
  payload: {
    isInit,
  },
});

export const setNameValueAction = (name: string): AuthActionTypes => ({
  type: SET_NAME_VALUE,
  payload: {
    name,
  },
});

export const setEmailValueAction = (email: string): AuthActionTypes => ({
  type: SET_EMAIL_VALUE,
  payload: {
    email,
  },
});

export const setPasswordValueAction = (password: string): AuthActionTypes => ({
  type: SET_PASSWORD_VALUE,
  payload: {
    password,
  },
});

export const signupTh = (
  name: string,
  email: string,
  password: string
): ThunkAction<Promise<void>, RootState, unknown, AuthActionTypes> => async (
  dispatch
) => {
  const data = await exampleAPI(name, email, password);
  const user: IUser = {
    id: 255,
    name: data.split(', ')[0],
    email: data.split(', ')[1],
    status: 'customer',
    idBusiness: 200,
  };

  dispatch(setUserAction(user, true));
};

const exampleAPI = (
  name: string,
  email: string,
  password: string
): Promise<string> => {
  return Promise.resolve(`${name}, ${email}, ${password}`);
};
