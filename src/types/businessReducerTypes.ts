import {
  SET_BUSINESSES,
  SET_BUSINESS_PAGE_NUMBER,
  SET_SELECTED_BUSINESS,
} from '../redux/constants';

// State

export interface IBusiness {
  id: number | null | undefined;
  name: string | null | undefined;
  path: string | null | undefined;
}

export interface IBusinessState {
  businesses: Array<IBusiness | []>;
  selectedBusiness: IBusiness;
  pageNumber: number;
  countPages: number;
}

// Action

interface ISetBusinessesAction {
  type: typeof SET_BUSINESSES;
  payload: {
    businesses: Array<IBusiness | []>;
    countPages: number;
  };
}

interface ISetPageNumberAction {
  type: typeof SET_BUSINESS_PAGE_NUMBER;
  payload: {
    pageNumber: number;
  };
}

interface ISetSelectedBusinessAction {
  type: typeof SET_SELECTED_BUSINESS;
  payload: {
    selectedBusiness: IBusiness;
  };
}

export type BusinessActionTypes =
  | ISetBusinessesAction
  | ISetPageNumberAction
  | ISetSelectedBusinessAction;

// common

export interface IUpdateBusinessObj {
  name?: string;
  image?: string | ArrayBuffer | null;
}
