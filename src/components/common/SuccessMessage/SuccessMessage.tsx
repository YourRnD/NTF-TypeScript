import React from 'react';
import Style from './SuccessMessage.module.css';

type PropsType = {
  successMessage: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const SuccessMessage: React.FC<PropsType> = ({ successMessage, onClick }) => (
  <div className={Style.root} data-type="close" role="button" onClick={onClick}>
    <div className={Style.container}>
      <span
        data-type="close"
        role="button"
        className={Style.close}
        onClick={onClick}
      >
        {' '}
      </span>
      <h1 className={Style.title}>Success</h1>
      <p className={Style.description}>{successMessage}</p>
    </div>
  </div>
);

export default SuccessMessage;
