import { SET_USER, SET_INIT } from '../constants';
import { IUser, AuthActionTypes } from '../../types/authReducerTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { authAPI } from '../../api/api';
import { changeLoaded, setError, setSuccess } from './commonAction';
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
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }

  dispatch(changeLoaded(false));
};

export const signinTh = (
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
    .signin(email, password)
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
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const checkAuthTh = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AuthActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await authAPI.me().then((result) => result.data);
  if (data.status === 200) {
    const user: IUser = {
      id: data.user?.id,
      name: data.user?.name,
      email: data.user?.email,
      status: data.user?.userStatus,
      idBusiness: data.user?.business,
    };

    dispatch(setUserAction(user, true));
  }
  dispatch(setInitAction(true));
  dispatch(changeLoaded(false));
};

/*
export const signupTh = (name, email, password) => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await authAPI.signup(name, email, password);
  if (data.status !== 200) {
    dispatch(errorTh(data));
  }
  dispatch(changeLoaded(false));
};

export const checkAuthTh = () => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await authAPI.me();
  if (data.status === 200) {
    dispatch(
      setAuthUserData(
        data.user.id,
        data.user.email,
        data.user.name,
        true,
        data.user.userStatus,
        data.user.business ? data.user.business : null
      )
    );
  }
  dispatch(changeLoaded(false));
  dispatch(setInitialized(true));
};
*/
