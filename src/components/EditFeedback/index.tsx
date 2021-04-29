import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPointTh } from '../../redux/actions/pointAction';
import { RootState } from '../../redux/reducers';
import { ISelectedPoint } from '../../types/pointReducerTypes';
import EditFeedback from './EditFeedback';

interface IParams {
  id: number;
  type: 'edit' | 'create' | null;
}

interface IMatch {
  params: IParams;
}

type OwnPropsType = {
  match: IMatch;
};

type MapDispatchPropsType = {
  getPoint: (id: number) => void;
};

type MapStatePropsType = {
  point: ISelectedPoint;
};

type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType;

const EditFeedbackContainer: React.FC<PropsType> = ({
  match,
  getPoint,
  point,
}) => {
  useEffect(() => {
    getPoint(match.params.id);
  }, [getPoint, match.params.id]);

  return (
    <>
      <EditFeedback
        pointId={match.params.id}
        type={match.params.type}
        point={point}
      />
    </>
  );
};

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  point: state.point.selectedPoint,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  RootState
>(mapStateToProps, {
  getPoint: getPointTh,
})(EditFeedbackContainer);
