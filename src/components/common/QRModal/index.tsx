import React from 'react';
import { connect } from 'react-redux';
import { setHideQR } from '../../../redux/actions/commonAction';
import { RootState } from '../../../redux/reducers';
import { IQRModal } from '../../../types/commonReducerTypes';
import QRModalElem from './QRModal';

type MapStatePropsType = {
  QRModal: IQRModal;
};

type MapDispatchPropsType = {
  setHideQR: (QRModal: IQRModal) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const QRModalContainer: React.FC<PropsType> = ({ QRModal, setHideQR }) => {
  const hideModal = (e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>) => {
    const elem: HTMLDivElement | HTMLSpanElement | null = e?.currentTarget
      ? e.currentTarget
      : null;

    if (
      elem !== null &&
      elem.hasAttribute('data-type') &&
      elem.getAttribute('data-type') === 'close'
    ) {
      setHideQR({
        hide: true,
        path: undefined,
      });
    }
  };

  if (QRModal.path !== undefined && !QRModal.hide) {
    return <QRModalElem path={QRModal.path} hideModal={hideModal} />;
  }

  return <></>;
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  QRModal: state.common.QRModal,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapToStateProps, {
  setHideQR: setHideQR,
})(QRModalContainer);
