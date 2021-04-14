import {
  CHANGE_LOADED,
  SET_ERROR,
  SET_SUCCESS,
  SET_UPLOAD_IMAGE,
} from '../redux/constants';

// Store
export interface IError {
  status: number | undefined;
  param?: string | undefined;
  message: string | undefined;
}

export interface IUploadImage {
  name: string;
  type: string;
  imageInBase64: string | ArrayBuffer | null;
}

export interface ICommon {
  isLoaded: boolean;
  error: IError;
  isError: boolean;
  uploadImage: IUploadImage;
  isSuccess: boolean;
  successMessage: string;
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

export interface ISetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: {
    successMessage: string;
    isSuccess: boolean;
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
  | ISetSuccessAction
  | ISetUploadImageAction;
