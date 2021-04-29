import {
  SET_POINTS,
  SET_POINT_PAGE_NUMBER,
  SET_SELECTED_POINT,
} from '../redux/constants';

// State

export interface IPoint {
  id: number | null | undefined;
  name: string | null | undefined;
  address: string | null | undefined;
}

export interface ISelectedPoint {
  id: number | null | undefined;
  name: string | null | undefined;
  address: string | null | undefined;
  path: string | null | undefined;
  businessName: string | null | undefined;
}

export interface IPointState {
  points: Array<IPoint> | [];
  selectedPoint: ISelectedPoint;
  pageNumber: number;
  countPages: number;
}

// Action

interface ISetPointsAction {
  type: typeof SET_POINTS;
  payload: {
    points: Array<IPoint> | [];
    countPages: number;
  };
}

interface ISetPageNumberAction {
  type: typeof SET_POINT_PAGE_NUMBER;
  payload: {
    pageNumber: number;
  };
}

interface ISetSelectedPointAction {
  type: typeof SET_SELECTED_POINT;
  payload: {
    selectedPoint: ISelectedPoint;
  };
}

export type PointActionTypes =
  | ISetPointsAction
  | ISetPageNumberAction
  | ISetSelectedPointAction;

// common

export interface IUpdatePointsObj {
  name?: string;
  address?: string;
  businessId?: number;
}
