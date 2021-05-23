import React from 'react';
import Style from './QRModal.module.css';

type PropsType = {
  path: string;
  hideModal: (e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>) => void;
};

const QRModal: React.FC<PropsType> = ({ path, hideModal }) => (
  <div className={Style.root}>
    <div className={Style.container}>
      <span
        data-type="close"
        role="button"
        className={Style.close}
        onClick={hideModal}
      >
        {' '}
      </span>
      <img src={path} alt="QR-code for redirect to feedback" />
    </div>
    <div
      className={Style.background}
      data-type="close"
      role="button"
      onClick={hideModal}
    ></div>
  </div>
);

export default QRModal;
