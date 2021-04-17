import { IPointState, PointActionTypes } from '../../types/pointReducerTypes';
import {
  SET_POINTS,
  SET_POINT_PAGE_NUMBER,
  SET_SELECTED_POINT,
} from '../constants';

type statePoint = IPointState;

const initialState: statePoint = {
  points: [],
  selectedPoint: {
    id: null,
    name: null,
    address: null,
  },
  pageNumber: 0,
  countPages: 1,
};

const pointReducer = (
  state = initialState,
  action: PointActionTypes
): statePoint => {
  switch (action.type) {
    case SET_POINTS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SELECTED_POINT:
      return {
        ...state,
        ...action.payload,
      };
    case SET_POINT_PAGE_NUMBER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default pointReducer;
