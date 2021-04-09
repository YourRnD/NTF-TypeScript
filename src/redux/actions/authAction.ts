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
import { authAPI } from '../../api/api';
import { changeLoaded, setError } from './commonAction';
import { CommonActionTypes } from '../../types/commonReducerTypes';

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
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AuthActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));

  const data = await authAPI
    .signup(name, email, password)
    .then((result) => result.data);
  if (data.status === 200) {
    const user: IUser = {
      id: data.user?.id,
      name: data.user?.name,
      email: data.user?.email,
      status: data.user?.userStatus,
      idBusiness: data.user?.business,
    };

    dispatch(setUserAction(user, true));
  } else {
    dispatch(setError(data, true));
  }

  dispatch(changeLoaded(false));
};
