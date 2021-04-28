// Input

import { IUploadImage } from './commonReducerTypes';

interface IFormComponentAdditionallyProps {
  name: string;
  value: string;
  onChange: () => void;
}

// Radio

export interface IRadioAdditionallyProps {
  value: string;
  id: string;
}

// Form controls

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
    errors: any;
    setFieldValue: (
      field: string,
      value: string | null | number | undefined | Array<IUploadImage>,
      shouldValidate?: boolean
    ) => void;
  };
  anotherArg: IFieldAdditionallyProps;
};
