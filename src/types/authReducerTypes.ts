import { SET_USER, SET_INIT, SET_TYPE_OP } from '../redux/constants';

// State
export interface IUser {
  id: number | null | undefined;
  email: string | null | undefined;
  name: string | null | undefined;
  status: string | null | undefined;
  idBusiness: number | null | undefined;
}

export interface IAuthState {
  isAuth: boolean;
  isInit: boolean;
  typeOperation: 'Regist' | 'Login' | 'Hide';
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

interface ISetTypeOperation {
  type: typeof SET_TYPE_OP;
  payload: {
    typeOperation: 'Regist' | 'Login' | 'Hide';
  };
}

export type AuthActionTypes =
  | ISetUserAction
  | ISetInitAction
  | ISetTypeOperation;
