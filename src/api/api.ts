import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IBusiness, IUpdateBusinessObj } from '../types/businessReducerTypes';
import { IUpdatePointsObj } from '../types/pointReducerTypes';

const instance = axios.create({
  baseURL: 'https://star-it-api.herokuapp.com/', // 'http://localhost:3500/',
});

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response?.config?.url?.split('/')[2] === 'signin') {
      if (localStorage.getItem('star-it-remember-me') === 'true') {
        sessionStorage.removeItem('star_it_access_token');
        sessionStorage.removeItem('star_it_refresh_token');
        localStorage.setItem('star_it_access_token', response.data.accessToken);
        localStorage.setItem(
          'star_it_refresh_token',
          response.data.refreshToken
        );
      } else {
        localStorage.removeItem('star_it_access_token');
        localStorage.removeItem('star_it_refresh_token');
        sessionStorage.setItem(
          'star_it_access_token',
          response.data.accessToken
        );
        sessionStorage.setItem(
          'star_it_refresh_token',
          response.data.refreshToken
        );
      }
    }

    return response;
  },
  (error) => error.response
);

instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    const config = request;

    if (
      config?.url?.split('/')[2] !== 'signin' ||
      config?.url?.split('/')[2] !== 'signup'
    ) {
      if (config?.url?.split('/')[2] === 'refresh') {
        config.headers.Authorization = `${
          localStorage.getItem('star_it_refresh_token') !== null
            ? localStorage.getItem('star_it_refresh_token')
            : sessionStorage.getItem('star_it_refresh_token')
        }`;
      } else {
        config.headers.Authorization = `${
          localStorage.getItem('star_it_access_token') !== null
            ? localStorage.getItem('star_it_access_token')
            : sessionStorage.getItem('star_it_access_token') !== null
            ? sessionStorage.getItem('star_it_access_token')
            : 'Anonim'
        }`;
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

interface IUser {
  id: number | null;
  name: string | null;
  email: string | null;
  userStatus?: string | null;
  business?: number | null;
}

export interface IAuthAPI {
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
}

export interface IBusinessAPI {
  business?: IBusiness;
}

interface IPoint {
  id: number | null | undefined;
  name: string | null | undefined;
  address: string | null | undefined;
  path?: Array<string> | null | undefined;
  businessName?: string | null | undefined;
}

export interface IPointAPI {
  point?: IPoint;
  points?: Array<IPoint> | [];
  countPages?: number | null | undefined;
}

export interface IUniversalResultData {
  message: string;
  status: number;
  param?: string;
}

export type ResultType = {
  data: IUniversalResultData & (IAuthAPI | IBusinessAPI | IPointAPI);
};

export const authAPI = {
  path: 'api/auth/',
  signin(email: string, password: string): Promise<ResultType> {
    return instance.get(`${this.path}signin`, {
      params: {
        email,
        password,
      },
    });
  },
  signup(name: string, email: string, password: string): Promise<ResultType> {
    return instance.post(`${this.path}signup`, {
      payload: {
        name,
        email,
        password,
      },
    });
  },
  me(): Promise<ResultType> {
    return instance.get(`${this.path}me`);
  },
  refresh(): Promise<ResultType> {
    return instance.get(`${this.path}refresh`);
  },
};

export const businessAPI = {
  path: 'api/business/',
  get(id: number): Promise<ResultType> {
    return instance.get(`${this.path}${id}`, {
      params: {},
    });
  },
  add(name: string, image: Array<string | ArrayBuffer>): Promise<ResultType> {
    return instance.post(`${this.path}`, {
      payload: {
        name,
        image,
      },
    });
  },
  update(id: number, obj: IUpdateBusinessObj): Promise<ResultType> {
    return instance.put(`${this.path}${id}`, {
      payload: {
        ...obj,
      },
    });
  },
};

export const pointAPI = {
  path: 'api/point/',
  search(pageNumber: number, value: string): Promise<ResultType> {
    return instance.get(`${this.path}search`, {
      params: {
        pageNumber,
        value,
      },
    });
  },
  get(id: number): Promise<ResultType> {
    return instance.get(`${this.path}${id}`, {
      params: {},
    });
  },
  getAll(pageNumber: number): Promise<ResultType> {
    return instance.get(`${this.path}`, {
      params: {
        pageNumber,
      },
    });
  },
  getAllGroupByBusinessId(
    pageNumber: number,
    businessId: number
  ): Promise<ResultType> {
    return instance.get(`${this.path}group-by-business`, {
      params: {
        pageNumber,
        businessId,
      },
    });
  },
  add(
    name: string,
    address: string,
    idbusiness: number | null
  ): Promise<ResultType> {
    const payload: {
      name: string;
      address: string;
      idbusiness?: number | null;
    } = {
      name,
      address,
    };
    idbusiness !== null ? (payload.idbusiness = idbusiness) : null;
    return instance.post(`${this.path}`, {
      payload,
    });
  },
  update(id: number, obj: IUpdatePointsObj): Promise<ResultType> {
    return instance.put(`${this.path}${id}`, {
      payload: {
        ...obj,
      },
    });
  },
};

export const feedbackAPI = {
  path: 'api/feedback/',
  add(
    rating: '1' | '2' | '3' | '4' | '5',
    notes: string,
    idPoint: number,
    image: Array<string | ArrayBuffer> | null
  ): Promise<ResultType> {
    const payload: {
      rating: '1' | '2' | '3' | '4' | '5';
      notes: string;
      idPoint: number;
      image?: Array<string | ArrayBuffer>;
    } = {
      rating,
      notes,
      idPoint,
    };
    image !== null ? (payload.image = image) : null;
    return instance.post(`${this.path}`, {
      payload,
    });
  },
};
