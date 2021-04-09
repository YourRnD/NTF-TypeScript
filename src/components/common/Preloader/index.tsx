import React from 'react';
import Style from './Preloader.module.css';
import preloader from './assets/loader.gif';

type PropsType = {
  isLoader: boolean;
};

const Preloader: React.FC<PropsType> = ({ isLoader }) => {
  if (isLoader) {
    return (
      <div className={Style.loader}>
        <img className={Style.loaderInner} src={preloader} alt="Прелоадер" />
      </div>
    );
  }

  return <></>;
};

export default Preloader;
