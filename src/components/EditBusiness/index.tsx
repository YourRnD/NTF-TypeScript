import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import EditBusiness from './EditBusiness';
import { RootState } from '../../redux/reducers';

type MapStatePropsType = {
  status: string | null | undefined;
};

type PropsType = MapStatePropsType;

const EditBusinessContainer: React.FC<PropsType> = ({ status }) => (
  <>
    {status === 'admin' || status === 'manager' ? (
      <EditBusiness status={status} />
    ) : (
      <Redirect to="/home" />
    )}
  </>
);

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  status: state.auth.user.status,
});

export default connect<MapStatePropsType, {}, {}, RootState>(
  mapStateToProps,
  {}
)(EditBusinessContainer);
