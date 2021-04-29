import React from 'react';

type PropsType = {
  placeholder: string;
  name: string;
  onChange: () => void;
  id: string;
  value: string;
};

const RadioInput: React.FC<PropsType> = ({
  id,
  value,
  name,
  onChange,
  placeholder,
}) => (
  <>
    <input type="radio" id={id} value={value} name={name} onChange={onChange} />
    <label htmlFor={id} title={placeholder}></label>
  </>
);

export default RadioInput;
