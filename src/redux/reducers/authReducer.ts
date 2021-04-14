import { SET_USER, SET_INIT } from '../constants';
import { AuthActionTypes, IAuthState } from '../../types/authReducerTypes';

type stateAuth = IAuthState;

const initialState: stateAuth = {
  user: {
    id: null,
    email: null,
    name: null,
    status: null,
    idBusiness: null,
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
    default:
      return state;
  }
};

export default authReducer;
