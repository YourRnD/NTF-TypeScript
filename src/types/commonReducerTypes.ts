import { CHANGE_LOADED, SET_ERROR, SET_UPLOAD_IMAGE } from '../redux/constants';

// Store
export interface IError {
  status: number | undefined;
  param?: string | undefined;
  message: string | undefined;
}

export interface IUploadImage {
  name: string;
  type: string;
  imageInBase64: string;
}

export interface ICommon {
  isLoaded: boolean;
  error: IError;
  isError: boolean;
  uploadImage: IUploadImage;
}

// Actions

export interface IChangeLoadAction {
  type: typeof CHANGE_LOADED;
  payload: {
    isLoaded: boolean;
  };
}

export interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: {
    error: IError;
    isError: boolean;
  };
}

interface ISetUploadImageAction {
  type: typeof SET_UPLOAD_IMAGE;
  payload: {
    uploadImage: IUploadImage;
  };
}

export type CommonActionTypes =
  | IChangeLoadAction
  | ISetErrorAction
  | ISetUploadImageAction;
