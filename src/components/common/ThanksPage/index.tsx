import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setThankInfo } from '../../../redux/actions/commonAction';
import { RootState } from '../../../redux/reducers';
import { IThankInfo } from '../../../types/commonReducerTypes';
import ThanksPage from './ThanksPage';

type MapStatePropsType = {
  thankInfo: IThankInfo;
  isThank: boolean;
};

type MapDispatchPropsType = {
  setThankInfo: (thankInfo: IThankInfo, isThank: boolean) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const ThanksPageContainer: React.FC<PropsType> = ({
  thankInfo,
  isThank,
  setThankInfo,
}) => {
  const onClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const elem: HTMLDivElement | null = e?.currentTarget
      ? e.currentTarget
      : null;

    if (
      elem !== null &&
      elem.hasAttribute('data-type') &&
      elem.getAttribute('data-type') === 'close'
    ) {
      setThankInfo(
        {
          path: undefined,
          score: undefined,
        },
        false
      );
    }
  };

  useEffect(() => {
    if (isThank) {
      /* setTimeout(() => {
        setThankInfo(
          {
            path: undefined,
            score: undefined,
          },
          false
        );
      }, 5000); */
    }
  }, [isThank, setThankInfo]);

  if (isThank) {
    return <ThanksPage thankInfo={thankInfo} onClick={onClick} />;
  }

  return <></>;
};

const mapStateToProps = (state: RootState) => ({
  thankInfo: state.common.thankInfo,
  isThank: state.common.isThank,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapStateToProps, {
  setThankInfo,
})(ThanksPageContainer);
