import {
  BusinessActionTypes,
  IBusinessState,
} from '../../types/businessReducerTypes';
import {
  SET_BUSINESSES,
  SET_BUSINESS_PAGE_NUMBER,
  SET_SELECTED_BUSINESS,
} from '../constants';

const initialState: IBusinessState = {
  businesses: [],
  selectedBusiness: {
    id: null,
    name: null,
    path: null,
  },
  pageNumber: 0,
  countPages: 1,
};

const businessReducer = (
  state = initialState,
  action: BusinessActionTypes
): IBusinessState => {
  switch (action.type) {
    case SET_BUSINESSES:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SELECTED_BUSINESS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_BUSINESS_PAGE_NUMBER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default businessReducer;
