import { ThunkAction } from 'redux-thunk';
import { businessAPI, IBusinessAPI, IUniversalResultData } from '../../api/api';
import {
  BusinessActionTypes,
  IBusiness,
  IUpdateBusinessObj,
} from '../../types/businessReducerTypes';
import { CommonActionTypes } from '../../types/commonReducerTypes';
import {
  SET_BUSINESSES,
  SET_BUSINESS_PAGE_NUMBER,
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
  type: SET_BUSINESS_PAGE_NUMBER,
  payload: {
    pageNumber,
  },
});

export const createBusinessTh = (
  name: string,
  logo: Array<string | ArrayBuffer>
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  BusinessActionTypes | CommonActionTypes
> => async (dispatch) => {
  dispatch(changeLoaded(true));
  const nameNew = name.replace(/\s+/g, ' ').trim();
  const data = await businessAPI
    .add(nameNew, logo)
    .then((result) => result.data);
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
  if (obj.image !== undefined || obj.name !== undefined) {
    const data = await businessAPI
      .update(id, obj)
      .then((result) => result.data);
    if (data.status === 200) {
      dispatch(setSuccess(data.message, true));
    } else {
      dispatch(setError(data, true));
    }
  } else {
    dispatch(
      setError(
        {
          status: 400,
          message: 'None of the fields are filled',
        },
        true
      )
    );
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
      path: data.business?.path === undefined ? [] : data.business.path,
    };

    dispatch(setSelectedBusiness(business));
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};
