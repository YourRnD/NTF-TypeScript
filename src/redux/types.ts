import { SET_USER, SET_INIT } from './constants';

// Store
export interface IUser {
  id: number | null;
  email: string | null;
  name: string | null;
  status: string | null;
  idBusiness: number | null;
}

export interface IAuth {
  isAuth: boolean;
  isInit: boolean;
  user: IUser;
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

export type AuthActionTypes = ISetUserAction | ISetInitAction;
