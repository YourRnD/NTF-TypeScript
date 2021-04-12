import React from 'react';
import { connect } from 'react-redux';
import { setSuccess } from '../../../redux/actions/commonAction';
import { RootState } from '../../../redux/reducers';
import SuccessMessage from './SuccessMessage';

type MapStatePropsType = {
  isSuccess: boolean;
  successMessage: string;
};

type MapDispatchPropsType = {
  setSuccess: (successMessage: string, isSuccess: boolean) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const SuccessMessageContainer: React.FC<PropsType> = ({
  isSuccess,
  successMessage,
  setSuccess,
}) => {
  const onClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>
  ): void => {
    const elem: HTMLDivElement | HTMLSpanElement | null = e?.currentTarget
      ? e.currentTarget
      : null;

    if (
      elem !== null &&
      elem.hasAttribute('data-type') &&
      elem.getAttribute('data-type') === 'close'
    ) {
      setSuccess('', false);
    }
  };

  if (isSuccess) {
    return <SuccessMessage successMessage={successMessage} onClick={onClick} />;
  }

  return <></>;
};

const mapStateToProps = (state: RootState) => ({
  successMessage: state.common.successMessage,
  isSuccess: state.common.isSuccess,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapStateToProps, {
  setSuccess,
})(SuccessMessageContainer);
