import {
  CommonActionTypes,
  IError,
  IQRModal,
  IThankInfo,
  IUploadImage,
} from '../../types/commonReducerTypes';
import {
  CHANGE_LOADED,
  SET_ERROR,
  SET_HIDE_QR,
  SET_SUCCESS,
  SET_THANK_INFO,
  SET_UPLOAD_IMAGE,
} from '../constants';

export const changeLoaded = (isLoaded: boolean): CommonActionTypes => ({
  type: CHANGE_LOADED,
  payload: {
    isLoaded,
  },
});

export const setError = (
  error: IError,
  isError: boolean
): CommonActionTypes => ({
  type: SET_ERROR,
  payload: {
    error: {
      message: error.message,
      status: error.status,
      param: error.param ? error.param : '',
    },
    isError,
  },
});

export const setThankInfo = (
  thankInfo: IThankInfo,
  isThank: boolean
): CommonActionTypes => ({
  type: SET_THANK_INFO,
  payload: {
    thankInfo,
    isThank,
  },
});

export const setHideQR = (QRModal: IQRModal): CommonActionTypes => ({
  type: SET_HIDE_QR,
  payload: {
    QRModal,
  },
});

export const setSuccess = (
  successMessage: string,
  isSuccess: boolean
): CommonActionTypes => ({
  type: SET_SUCCESS,
  payload: {
    successMessage,
    isSuccess,
  },
});

export const setUploadImage = (
  uploadImages: Array<IUploadImage> | null,
  countImages: number
): CommonActionTypes => ({
  type: SET_UPLOAD_IMAGE,
  payload: {
    uploadImages,
    countImages,
  },
});
