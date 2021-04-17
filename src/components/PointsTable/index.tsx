import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getPointsWithBusinessIdTh,
  setPageNumber,
} from '../../redux/actions/pointAction';
import { RootState } from '../../redux/reducers';
import { IPoint } from '../../types/pointReducerTypes';
import PointsTable from './PointsTable';

type MapStatePropsType = {
  pageNumber: number;
  countPages: number;
  points: Array<IPoint> | [];
  businessId: number | null | undefined;
};

type MapDispatchPropsType = {
  onPageChanged: (pageNumber: number) => void;
  getPoints: (pageNumber: number, businessId: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const PointsTableContainer: React.FC<PropsType> = ({
  pageNumber,
  countPages,
  onPageChanged,
  points,
  getPoints,
  businessId,
}) => {
  useEffect(() => {
    if (businessId === undefined || businessId === null) {
      return;
    } else {
      getPoints(pageNumber, businessId);
    }
  }, [pageNumber, businessId, getPoints]);

  return (
    <PointsTable
      pageNumber={pageNumber}
      countPages={countPages}
      onPageChanged={onPageChanged}
      points={points}
    />
  );
};

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  pageNumber: state.point.pageNumber,
  countPages: state.point.countPages,
  points: state.point.points,
  businessId: state.auth.user.idBusiness,
});

export default connect(mapStateToProps, {
  onPageChanged: setPageNumber,
  getPoints: getPointsWithBusinessIdTh,
})(PointsTableContainer);
