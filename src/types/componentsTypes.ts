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
  value: string;
  onChange: () => void;
  onBlur: () => void;
  onFocus: () => void;
}

interface IInputProps {
  field: IInputAdditionallyProps;
  placeholder: string;
  type: string;
}

export type FormControlsType = IInputProps | null;
