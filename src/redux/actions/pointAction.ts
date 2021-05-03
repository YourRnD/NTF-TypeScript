import { ThunkAction } from 'redux-thunk';
import { CommonActionTypes } from '../../types/commonReducerTypes';
import {
  IPoint,
  ISelectedPoint,
  IUpdatePointsObj,
  PointActionTypes,
} from '../../types/pointReducerTypes';
import { changeLoaded, setSuccess, setError } from './commonAction';
import {
  SET_POINTS,
  SET_POINT_PAGE_NUMBER,
  SET_SELECTED_POINT,
} from '../constants';
import { RootState } from '../reducers';
import { IPointAPI, IUniversalResultData, pointAPI } from '../../api/api';

// Actions level

export const setPoints = (
  points: Array<IPoint> | [],
  countPages: number
): PointActionTypes => ({
  type: SET_POINTS,
  payload: {
    points,
    countPages,
  },
});

export const setSelectedPoint = (
  selectedPoint: ISelectedPoint
): PointActionTypes => ({
  type: SET_SELECTED_POINT,
  payload: {
    selectedPoint,
  },
});

export const setPageNumber = (pageNumber: number): PointActionTypes => ({
  type: SET_POINT_PAGE_NUMBER,
  payload: {
    pageNumber,
  },
});

// Thunks level

export const createPointTh = (
  name: string,
  address: string,
  businessId: number | null
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  PointActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await pointAPI
    .add(name, address, businessId)
    .then((result) => result.data);
  if (data.status === 200) {
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const updatePointTh = (
  id: number,
  obj: IUpdatePointsObj
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  PointActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await pointAPI.update(id, obj).then((result) => result.data);
  if (data.status === 200) {
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const getPointsTh = (
  pageNumber: number
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  PointActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data: IUniversalResultData & IPointAPI = await pointAPI
    .getAll(pageNumber)
    .then((result) => result.data);
  if (data.status === 200) {
    const points = data?.points ? data.points : [];
    const countPages =
      data?.countPages === undefined || data?.countPages === null
        ? 0
        : data.countPages;

    dispatch(setPoints(points, countPages));
  } else {
    if (data.message !== 'No records find!') dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const getPointsWithBusinessIdTh = (
  pageNumber: number,
  businessId: number
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  PointActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data: IUniversalResultData &
    IPointAPI = await pointAPI
    .getAllGroupByBusinessId(pageNumber, businessId)
    .then((result) => result.data);
  if (data.status === 200) {
    const points = data?.points ? data.points : [];
    const countPages =
      data?.countPages === undefined || data?.countPages === null
        ? 0
        : data.countPages;

    console.log(data);

    dispatch(setPoints(points, countPages));
  } else {
    if (data.message !== 'No records find!') dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const searchPointsTh = (
  pageNumber: number,
  value: string
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  PointActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data: IUniversalResultData & IPointAPI = await pointAPI
    .search(pageNumber, value)
    .then((result) => result.data);
  if (data.status === 200) {
    const points = data?.points ? data.points : [];
    const countPages =
      data?.countPages === undefined || data?.countPages === null
        ? 0
        : data.countPages;

    dispatch(setPoints(points, countPages));
  } else {
    if (data.message !== 'No records find!') dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const getPointTh = (
  id: number
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  PointActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data: IUniversalResultData & IPointAPI = await pointAPI
    .get(id)
    .then((result) => result.data);
  if (data.status === 200) {
    const point = {
      id: data?.point?.id ? data?.point?.id : null,
      address: data?.point?.address ? data?.point?.address : null,
      name: data?.point?.name ? data?.point?.name : null,
      businessName: data?.point?.businessName
        ? data?.point?.businessName
        : null,
      path: data?.point?.path ? data?.point?.path[0] : null,
    };

    dispatch(setSelectedPoint(point));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};
