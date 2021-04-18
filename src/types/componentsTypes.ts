// Input

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
}

export type FormControlsType = {
  field: IFormComponentAdditionallyProps;
  placeholder: string;
  form: {
    errors: any;
  };
  anotherArg: IFieldAdditionallyProps;
};
