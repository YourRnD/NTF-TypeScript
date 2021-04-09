import React from 'react';
import { connect } from 'react-redux';
import { setError } from '../../../redux/actions/commonAction';
import { RootState } from '../../../redux/reducers';
import { IError } from '../../../types/commonReducerTypes';
import ErrorMessage from './ErrorMessage';

type MapStatePropsType = {
  isError: boolean;
  error: IError;
};

type MapDispatchPropsType = {
  setError: (error: IError, isError: boolean) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const ErrorMessageContainer: React.FC<PropsType> = ({
  isError,
  error,
  setError,
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
      setError(
        {
          status: 0,
          param: '',
          message: '',
        },
        false
      );
    }
  };

  if (isError) {
    return <ErrorMessage error={error} onClick={onClick} />;
  }

  return <></>;
};

const mapStateToProps = (state: RootState) => ({
  error: state.common.error,
  isError: state.common.isError,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapStateToProps, {
  setError,
})(ErrorMessageContainer);
