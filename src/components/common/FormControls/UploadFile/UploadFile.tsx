import React from 'react';
import Style from './UploadFile.module.css';

type PropsType = {
  placeholder: string;
  id: string;
  fileName: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
};

const UploadFile: React.FC<PropsType> = ({
  placeholder,
  fileName,
  name,
  onChange,
  error,
  id,
}) => {
  return (
    <label htmlFor={id} className={Style['upload-file-label']}>
      {fileName !== '' ? `Файл: ${fileName}` : 'Загрузить файл'}
      <input
        type="file"
        id={id}
        name={name}
        placeholder={placeholder}
        className={Style['upload-file']}
        onChange={onChange}
      />
      {error !== null ? <p className={Style.error}>{error}</p> : null}
    </label>
  );
};

export default UploadFile;
