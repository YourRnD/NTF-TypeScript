import { CommonActionTypes, ICommon } from '../../types/commonReducerTypes';
import {
  CHANGE_LOADED,
  CHANGE_UPLOAD_MODAL,
  SET_ERROR,
  SET_HIDE_QR,
  SET_SUCCESS,
  SET_THANK_INFO,
  SET_UPLOAD_IMAGE,
} from '../constants';

type stateCommon = ICommon;

const initialState: stateCommon = {
  isLoaded: false,
  error: {
    status: 0,
    param: '',
    message: '',
  },
  isError: false,
  uploadImages: {
    isUploadModal: false,
  },
  isSuccess: false,
  successMessage: '',
  isThank: false,
  thankInfo: {
    score: undefined,
    path: undefined,
  },
  QRModal: {
    hide: true,
    path: undefined,
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
    case SET_HIDE_QR:
      return {
        ...state,
        ...action.payload,
      };
    case SET_THANK_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_UPLOAD_IMAGE:
      return {
        ...state,
        ...action.payload,
      };
    case CHANGE_UPLOAD_MODAL:
      return {
        ...state,
        uploadImages: {
          ...state.uploadImages,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default commonReducer;
