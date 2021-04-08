import {
  SET_USER,
  SET_INIT,
  SET_NAME_VALUE,
  SET_EMAIL_VALUE,
  SET_PASSWORD_VALUE,
} from '../redux/constants';

// Store
export interface IUser {
  id: number | null;
  email: string | null;
  name: string | null;
  status: string | null;
  idBusiness: number | null;
}

export interface IValues {
  email: string;
  name: string;
  password: string;
}

export interface IAuth {
  isAuth: boolean;
  isInit: boolean;
  user: IUser;
  values: IValues;
}

// Actions
interface ISetUserAction {
  type: typeof SET_USER;
  payload: {
    user: IUser;
    isAuth: boolean;
  };
}

interface ISetInitAction {
  type: typeof SET_INIT;
  payload: {
    isInit: boolean;
  };
}

interface ISetNameValue {
  type: typeof SET_NAME_VALUE;
  payload: {
    name: string;
  };
}

interface ISetEmailValue {
  type: typeof SET_EMAIL_VALUE;
  payload: {
    email: string;
  };
}

interface ISetPasswordValue {
  type: typeof SET_PASSWORD_VALUE;
  payload: {
    password: string;
  };
}

export type AuthActionTypes =
  | ISetUserAction
  | ISetInitAction
  | ISetNameValue
  | ISetEmailValue
  | ISetPasswordValue;
