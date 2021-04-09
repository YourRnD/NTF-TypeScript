// Input

interface IInputAdditionallyProps {
  name: string;
  onChange: () => void;
}

interface IInputProps {
  field: IInputAdditionallyProps;
  placeholder: string;
  type: string;
  form: {
    errors: any;
  };
}

// Form controls

export interface IFieldAdditionallyProps {
  type?: string;
}

export type FormControlsType = IInputProps | null;
