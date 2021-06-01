import React from 'react';
import Style from './UploadFile.module.css';
import cameraIcon from './assets/camera_ico.png';
import { IUploadModalImages } from '../../../../types/componentsTypes';

type PropsType = {
  openModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hideModal: () => void;
  isModal: boolean;
  images: null | Array<IUploadModalImages>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (e: React.MouseEvent<HTMLSpanElement>) => void;
  addImg: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clearAllImg: () => void;
  maxElem: number;
};

const UploadFile: React.FC<PropsType> = ({
  openModal,
  hideModal,
  isModal,
  images,
  onChange,
  deleteImg,
  addImg,
  clearAllImg,
  maxElem,
}) => {
  const elements =
    images !== null
      ? images.map((item) => {
          return (
            <div key={item.id} className={Style['img-container']}>
              <img src={item.image} alt="Upload image" id={item.id} />
              <span
                data-type="dalete"
                role="button"
                className={Style['delete-img-btn']}
                onClick={deleteImg}
              ></span>
            </div>
          );
        })
      : null;

  return (
    <div className={Style.root} data-parent>
      <button
        type="button"
        onClick={openModal}
        className={Style['upload-file-btn']}
      >
        <img
          className={Style['camera-icon']}
          src={cameraIcon}
          alt="Icon of camera"
        />
      </button>
      <input
        type="file"
        name="image"
        className={Style['input']}
        onChange={onChange}
        accept="image/*"
        disabled={images !== null && maxElem <= images?.length ? true : false}
      />
      {isModal ? (
        <div className={Style.modal}>
          <div className={Style['modal-container']}>
            <span
              data-type="close"
              role="button"
              className={Style.close}
              onClick={hideModal}
            ></span>
            <div className={Style['images-container']}>{elements}</div>
            <div className={Style['buttons-container']}>
              {images !== null && maxElem <= images?.length ? null : (
                <button className={Style['modal-btn']} onClick={addImg}>
                  Add
                </button>
              )}
              <button className={Style['modal-btn']} onClick={clearAllImg}>
                Сancel
              </button>
            </div>
          </div>
          <div
            className={Style.background}
            data-type="close"
            role="button"
            onClick={hideModal}
          ></div>
        </div>
      ) : null}
    </div>
  );
};

export default UploadFile;
