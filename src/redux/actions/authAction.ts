import {
  SET_USER,
  SET_INIT,
  SET_NAME_VALUE,
  SET_EMAIL_VALUE,
  SET_PASSWORD_VALUE,
} from '../constants';
import { IUser, AuthActionTypes } from '../types';

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
