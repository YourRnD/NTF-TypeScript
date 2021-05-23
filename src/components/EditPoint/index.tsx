import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import EditPoint from './EditPoint';

type MapStatePropsType = {
  status: string | null | undefined;
};

interface IParams {
  id: number;
  type: 'edit' | 'create' | null;
  name?: string;
  address?: string;
}

interface IMatch {
  params: IParams;
}

type OwnPropsType = {
  match: IMatch;
};

type PropsType = MapStatePropsType & OwnPropsType;

const EditPointContainer: React.FC<PropsType> = ({ status, match }) => (
  <>
    {status === 'admin' || status === 'manager' ? (
      <EditPoint
        name={match.params.name}
        address={match.params.address}
        pointId={match.params.id}
        type={match.params.type}
      />
    ) : (
      <Redirect to="/home" />
    )}
  </>
);

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  status: state.auth.user.status,
});

export default connect<MapStatePropsType, {}, OwnPropsType, RootState>(
  mapStateToProps,
  {}
)(EditPointContainer);
