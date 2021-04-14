// Input

interface IInputAdditionallyProps {
  name: string;
  onChange: () => void;
}

// Form controls

export interface IFieldAdditionallyProps {
  type?: string;
  id?: string;
  fileName?: string;
}

export type FormControlsType = {
  field: IInputAdditionallyProps;
  placeholder: string;
  form: {
    errors: any;
  };
  anotherArg: IFieldAdditionallyProps;
};
