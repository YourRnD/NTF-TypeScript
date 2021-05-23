import {
  CHANGE_LOADED,
  SET_ERROR,
  SET_SUCCESS,
  SET_THANK_INFO,
  SET_UPLOAD_IMAGE,
  SET_HIDE_QR,
} from '../redux/constants';

// Store
export interface IError {
  status: number | undefined;
  param?: string | undefined;
  message: string | undefined;
}

export interface IQRModal {
  hide: boolean;
  path: string | undefined;
}

export interface IThankInfo {
  score: number | undefined;
  path: string | undefined;
}

export interface IUploadImage {
  name: string;
  type: string;
  imageInBase64: string | ArrayBuffer;
  id: string;
}

export interface ICommon {
  isLoaded: boolean;
  error: IError;
  isError: boolean;
  uploadImages: Array<IUploadImage> | null;
  countImages: number;
  isSuccess: boolean;
  successMessage: string;
  isThank: boolean;
  thankInfo: IThankInfo;
  QRModal: IQRModal;
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

export interface ISetThankInfo {
  type: typeof SET_THANK_INFO;
  payload: {
    thankInfo: IThankInfo;
    isThank: boolean;
  };
}

export interface ISetHideQR {
  type: typeof SET_HIDE_QR;
  payload: {
    QRModal: IQRModal;
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
    uploadImages: Array<IUploadImage> | null;
    countImages: number;
  };
}

export type CommonActionTypes =
  | IChangeLoadAction
  | ISetThankInfo
  | ISetErrorAction
  | ISetSuccessAction
  | ISetHideQR
  | ISetUploadImageAction;
