import { SET_USER, SET_INIT } from '../constants';
import { IUser, AuthActionTypes } from '../types';

export const setUserAction = (user: IUser, isAuth: boolean): AuthActionTypes => ({
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
