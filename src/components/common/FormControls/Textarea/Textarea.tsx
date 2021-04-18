import React from 'react';
import Style from './Textarea.module.css';

type PropsType = {
  placeholder: string;
  name: string;
  onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: () => void;
  error: string | null;
};

const Textarea: React.FC<PropsType> = ({
  placeholder,
  name,
  onBlur,
  onFocus,
  onChange,
  error,
}) => {
  return (
    <div className={Style.container}>
      <span className={Style.placeholder}>{placeholder}</span>
      <textarea
        placeholder={placeholder}
        className={Style.elem}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        onChange={onChange}
      />
      {error !== null ? <p className={Style.error}>{error}</p> : null}
    </div>
  );
};

export default Textarea;
