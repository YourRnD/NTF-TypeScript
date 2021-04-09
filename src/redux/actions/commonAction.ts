import {
  CommonActionTypes,
  IError,
  IUploadImage,
} from '../../types/commonReducerTypes';
import { CHANGE_LOADED, SET_ERROR, SET_UPLOAD_IMAGE } from '../constants';

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

export const setUploadImage = (
  uploadImage: IUploadImage
): CommonActionTypes => ({
  type: SET_UPLOAD_IMAGE,
  payload: {
    uploadImage,
  },
});
