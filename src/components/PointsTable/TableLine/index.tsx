import React from 'react';
import { connect } from 'react-redux';
import { setHideQR } from '../../../redux/actions/commonAction';
import { RootState } from '../../../redux/reducers';
import { IQRModal } from '../../../types/commonReducerTypes';
import TableLine from './TableLine';

type MapDispatchPropsType = {
  setHideQR: (QRModal: IQRModal) => void;
};

type OwnPropsType = {
  id: number | string;
  name: number | string;
  address: number | string;
  isTitle: boolean;
};

type PropsType = MapDispatchPropsType & OwnPropsType;

const TableLineContainer: React.FC<PropsType> = ({
  id,
  name,
  address,
  isTitle,
  setHideQR,
}) => {
  const openModal = () => {
    setHideQR({
      hide: false,
      path: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/edit-feedback/create/${id}`,
    });
  };

  return (
    <TableLine
      openModal={openModal}
      id={id}
      name={name}
      address={address}
      isTitle={isTitle}
    />
  );
};

export default connect<{}, MapDispatchPropsType, OwnPropsType, RootState>(
  null,
  {
    setHideQR: setHideQR,
  }
)(TableLineContainer);
