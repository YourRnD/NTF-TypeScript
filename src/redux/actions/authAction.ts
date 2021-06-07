import { SET_USER, SET_INIT, SET_TYPE_OP } from '../constants';
import { IUser, AuthActionTypes } from '../../types/authReducerTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { authAPI, IUniversalResultData, IAuthAPI } from '../../api/api';
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

export const setTypeOpAction = (
  typeOperation: 'Regist' | 'Login' | 'Hide'
): AuthActionTypes => ({
  type: SET_TYPE_OP,
  payload: {
    typeOperation,
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
  const data: IUniversalResultData & IAuthAPI = await authAPI
    .signin(email, password)
    .then((result) => result.data);
  if (data.status === 200) {
    const user: IUser = {
      id: data.user?.id || null,
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

export const checkAuthTh = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AuthActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data:
    | (IUniversalResultData & IAuthAPI)
    | 'Unauthorized'
    | undefined = await authAPI.me().then((result) => result?.data);
  if (data === 'Unauthorized') {
    localStorage.removeItem('star_it_access_token');
    localStorage.removeItem('star_it_refresh_token');
    sessionStorage.removeItem('star_it_access_token');
    sessionStorage.removeItem('star_it_refresh_token');
  } else if (data !== undefined && data.status === 200) {
    const user: IUser = {
      id: data.user?.id,
      name: data.user?.name,
      email: data.user?.email,
      status: data.user?.userStatus,
      idBusiness: data.user?.business,
    };

    dispatch(setUserAction(user, true));
  }
  dispatch(changeLoaded(false));
  dispatch(setInitAction(true));
};
