import {
  SET_USER,
  SET_INIT,
  SET_NAME_VALUE,
  SET_EMAIL_VALUE,
  SET_PASSWORD_VALUE,
} from '../constants';
import { AuthActionTypes, IAuth } from '../types';

type stateAuth = IAuth;

const initialState: stateAuth = {
  user: {
    id: null,
    email: null,
    name: null,
    status: null,
    idBusiness: null,
  },
  values: {
    name: '',
    email: '',
    password: '',
  },
  isAuth: false,
  isInit: false,
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): stateAuth => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case SET_INIT:
      return {
        ...state,
        ...action.payload,
      };
    case SET_NAME_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case SET_EMAIL_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case SET_PASSWORD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
