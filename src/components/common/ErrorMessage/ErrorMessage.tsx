import React from 'react';
import { IError } from '../../../types/commonReducerTypes';
import Style from './ErrorMessage.module.css';

type PropsType = {
  error: IError;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ErrorMessage: React.FC<PropsType> = ({ error, onClick }) => (
  <div className={Style.root}>
    <div className={Style.container}>
      <span
        data-type="close"
        role="button"
        className={Style.close}
        onClick={onClick}
      >
        {' '}
      </span>
      <h1 className={Style.title}>
        Error
        {error.param !== ''
          ? ` ${error.status} in ${error.param}!`
          : ` ${error.status}!`}
      </h1>
      <p className={Style.description}>{error.message}</p>
    </div>
    <div
      className={Style.background}
      data-type="close"
      role="button"
      onClick={onClick}
    ></div>
  </div>
);

export default ErrorMessage;
