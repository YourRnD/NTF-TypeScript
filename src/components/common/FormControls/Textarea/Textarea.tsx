import React from 'react';
import Style from './Textarea.module.css';

type PropsType = {
  placeholder: string;
  name: string;
  onChange: () => void;
  error: string | null;
};

const Textarea: React.FC<PropsType> = ({
  placeholder,
  name,
  onChange,
  error,
}) => {
  return (
    <div className={Style.container}>
      <textarea
        placeholder={placeholder}
        className={Style.elem}
        name={name}
        onChange={onChange}
      />
      {error !== null ? (
        <p data-testid="error" className={Style.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Textarea;
