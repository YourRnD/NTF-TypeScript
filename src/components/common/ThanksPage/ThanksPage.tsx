import React from 'react';
import { IThankInfo } from '../../../types/commonReducerTypes';
import Style from './ThanksPage.module.css';

type PropsType = {
  thankInfo: IThankInfo;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ThanksPage: React.FC<PropsType> = ({ thankInfo, onClick }) => {
  const starsArray = [1, 1, 1, 1, 1];

  return (
    <div
      className={Style.root}
      data-type="close"
      role="button"
      onClick={onClick}
    >
      <div className={Style.container}>
        <h1 className={Style.title}>Thank you for your review of our work!</h1>
        <img
          className={Style['business-logo']}
          src={thankInfo.path}
          alt="Business's logo"
        />
        <div className={Style.line}></div>
        <h4 className={Style['sub-title']}>
          We will respect your wishes and comments and will notify you of the
          results!
        </h4>
        <h3 className={Style['score-title']}>your score</h3>
        <div className={Style['score-container']}>
          {starsArray.map((item, index) => {
            if (thankInfo.score && index + 1 <= thankInfo.score) {
              return (
                <div
                  key={`star-${index}`}
                  className={`${Style.star} ${Style['change-star']}`}
                ></div>
              );
            } else {
              return <div key={`star-${index}`} className={Style.star}></div>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ThanksPage;
