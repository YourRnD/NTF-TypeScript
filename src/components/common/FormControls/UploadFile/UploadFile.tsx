import React from 'react';
import Style from './UploadFile.module.css';

type PropsType = {
  placeholder: string;
  id: string;
  fileName: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  add: () => void;
  error: string | null;
  maxElem: number;
};

const UploadFile: React.FC<PropsType> = ({
  placeholder,
  fileName,
  name,
  onChange,
  clear,
  add,
  error,
  id,
  maxElem,
}) => {
  return (
    <div className={Style.container}>
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
      </label>
      {maxElem === 1 ? (
        <></>
      ) : (
        <div onClick={add} className={Style['add-btn']} />
      )}

      <div onClick={clear} className={Style['close-btn']} />
      {error !== null ? <p className={Style.error}>{error}</p> : null}
    </div>
  );
};

export default UploadFile;
