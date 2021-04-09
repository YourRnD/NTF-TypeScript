import { CommonActionTypes, ICommon } from '../../types/commonReducerTypes';
import { CHANGE_LOADED, SET_ERROR, SET_UPLOAD_IMAGE } from '../constants';

type stateCommon = ICommon;

const initialState: stateCommon = {
  isLoaded: false,
  error: {
    status: 0,
    param: '',
    message: '',
  },
  isError: false,
  uploadImage: {
    name: '',
    type: '',
    imageInBase64: '',
  },
};

const commonReducer = (
  state = initialState,
  action: CommonActionTypes
): stateCommon => {
  switch (action.type) {
    case CHANGE_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case SET_UPLOAD_IMAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
