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
  image: string;
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
  image,
}) => {
  return (
    <div className={Style.root}>
      <div className={Style.container}>
        {maxElem === 1 ? (
          <></>
        ) : (
          <div onClick={add} data-testid="add" className={Style['add-btn']} />
        )}
        <div
          onClick={clear}
          data-testid="clear"
          className={Style['close-btn']}
        />
        <label htmlFor={id} className={Style['upload-file-label']}>
          <input
            type="file"
            id={id}
            name={name}
            placeholder={placeholder}
            className={Style['upload-file']}
            onChange={onChange}
          />
          <img src={image} alt="Image for upload" />
          <p className={Style.bottom}>
            {fileName !== '' ? `File: ${fileName}` : 'Upload file'}
          </p>
        </label>
      </div>
      {error !== null ? (
        <p data-testid="error" className={Style.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default UploadFile;
