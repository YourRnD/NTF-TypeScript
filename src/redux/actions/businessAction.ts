import { ThunkAction } from 'redux-thunk';
import { businessAPI, IBusinessAPI, IUniversalResultData } from '../../api/api';
import pathConvector from '../../common/pathConvector';
import {
  BusinessActionTypes,
  IBusiness,
  IUpdateBusinessObj,
} from '../../types/businessReducerTypes';
import { CommonActionTypes } from '../../types/commonReducerTypes';
import {
  SET_BUSINESSES,
  SET_PAGE_NUMBER,
  SET_SELECTED_BUSINESS,
} from '../constants';
import { RootState } from '../reducers';
import { changeLoaded, setError, setSuccess } from './commonAction';

export const setBusinesses = (
  businesses: Array<IBusiness | []>,
  countPages: number
): BusinessActionTypes => ({
  type: SET_BUSINESSES,
  payload: {
    businesses,
    countPages,
  },
});

export const setSelectedBusiness = (
  selectedBusiness: IBusiness
): BusinessActionTypes => ({
  type: SET_SELECTED_BUSINESS,
  payload: {
    selectedBusiness,
  },
});

export const setPageNumber = (pageNumber: number): BusinessActionTypes => ({
  type: SET_PAGE_NUMBER,
  payload: {
    pageNumber,
  },
});

export const createBusinessTh = (
  name: string,
  logo: string | ArrayBuffer
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  BusinessActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await businessAPI.add(name, logo).then((result) => result.data);
  if (data.status === 200) {
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const updateBusinessTh = (
  id: number,
  obj: IUpdateBusinessObj
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  BusinessActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await businessAPI.update(id, obj).then((result) => result.data);
  if (data.status === 200) {
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

export const getBusinessTh = (
  id: number
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  BusinessActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data: IUniversalResultData & IBusinessAPI = await businessAPI
    .get(id)
    .then((result) => result.data);
  if (data.status === 200) {
    const business: IBusiness = {
      id: data.business?.id,
      name: data.business?.name,
      path:
        data.business?.path !== '' &&
        data.business?.path !== null &&
        data.business?.path !== undefined
          ? pathConvector(data.business?.path)
          : '',
    };

    dispatch(setSelectedBusiness(business));
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

/*
import { businessAPI } from '../../../api/api';
import pathConvector from '../../../common/pathConvector';
import { changeLoaded, errorTh } from '../common';

// Actions level



// Thunks level

export const createBusinessTh = (name, logo) => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await businessAPI.add(name, logo);
  if (data.status === 200) {
    console.log('Sucsess');
  } else {
    dispatch(errorTh(data));
  }
  dispatch(changeLoaded(false));
};

export const updateBusinessTh = (id, obj) => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await businessAPI.update(id, obj);
  if (data.status === 200) {
    console.log('Sucsess');
  } else {
    dispatch(errorTh(data));
  }
  dispatch(changeLoaded(false));
};

export const getBusinessesTh = (pageNumber) => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await businessAPI.getAll(pageNumber);
  const businesses = data.businesses.map((item) => ({
    ...item,
    path: pathConvector(item.path),
  }));
  if (data.status === 200) {
    dispatch(setBusinesses(businesses, data.countPages));
  } else {
    errorTh(data);
  }
  dispatch(changeLoaded(false));
};

export const searchBusinessesTh = (pageNumber, value) => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await businessAPI.search(pageNumber, value);
  const businesses = data.businesses.map((item) => ({
    ...item,
    path: pathConvector(item.path),
  }));
  if (data.status === 200) {
    dispatch(setBusinesses(businesses, data.countPages));
  } else {
    errorTh(data);
  }
  dispatch(changeLoaded(false));
};

export const getBusinessTh = (id) => async (dispatch) => {
  dispatch(changeLoaded(true));
  const data = await businessAPI.get(id);
  if (data.status === 200) {
    dispatch(
      setSelectedBusiness({
        ...data.business,
        path: pathConvector(data.business.path),
      })
    );
  } else {
    errorTh(data);
  }
  dispatch(changeLoaded(false));
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESSES:
      return {
        ...state,
        ...action.data,
      };
    case SET_SELECTED_BUSINESS:
      return {
        ...state,
        ...action.data,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default authReducer;
*/
