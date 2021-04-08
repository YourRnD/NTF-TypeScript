// AuthForm

export interface IAuthFormInitialValues {
  name: string;
  password: string;
  email: string;
}

// Input

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

// Form controls

export interface IFieldAdditionallyProps {
  type?: string;
}

export type FormControlsType = IInputProps | null;
