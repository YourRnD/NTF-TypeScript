export interface IAuthFormInitialValues {
  name: string;
  password: string;
  email: string;
}

export interface IFieldAdditionallyProps {
  type?: string;
}

// Form controls

interface IInputAdditionallyProps {
  name: string;
}

interface IInputProps {
  field: IInputAdditionallyProps;
  placeholder: string;
  type: string;
  setStateValue: (value: string) => void;
  value: string;
}

export type FormControlsType = IInputProps | null;
