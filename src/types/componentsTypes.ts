// Input

import { IImage } from './commonReducerTypes';

interface IFormComponentAdditionallyProps {
  name: string;
  value: string;
  onChange: () => void;
}

// uploadImage

export interface IImageValidateError {
  message: string;
  id: string;
}

export interface IUploadModalImages {
  image: string;
  id: string;
}

// Radio

export interface IRadioAdditionallyProps {
  value: string;
  id: string;
}

// Form controls

export interface IFormControlsErrors {
  [key: string]: string | IImageValidateError[] | undefined;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: IImageValidateError[];
  rating?: string;
  feedback?: string;
  address?: string;
}

export interface IFieldAdditionallyProps {
  type?: string;
  id?: string;
  fileName?: string;
  valuesArray?: Array<IRadioAdditionallyProps>;
  maxElem?: number;
}

export type FormControlsType = {
  field: IFormComponentAdditionallyProps;
  placeholder: string;
  form: {
    errors: IFormControlsErrors;
    setFieldValue: (
      field: string,
      value: string | null | number | undefined | IImage,
      shouldValidate?: boolean
    ) => void;
  };
  anotherArg: IFieldAdditionallyProps;
};
