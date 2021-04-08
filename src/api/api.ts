import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://star-it-api.herokuapp.com/', // 'http://localhost:3500/',
});

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response?.config?.url?.split('/')[2] === 'signin') {
      localStorage.setItem('star_it_access_token', response.data.accessToken);
      localStorage.setItem('star_it_refresh_token', response.data.refreshToken);
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
        config.headers.Authorization = `${localStorage.getItem(
          'star_it_refresh_token'
        )}`;
      } else {
        config.headers.Authorization = `${localStorage.getItem(
          'star_it_access_token'
        )}`;
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

interface IUniversalResultData {
  message: string;
  status: number;
  accessToken?: string;
  refresh?: string;
  user?: IUser;
  param?: string;
}

export type ResultType = {
  data: IUniversalResultData;
};

export const authAPI = {
  path: 'api/auth/',
  signin(email: string, password: string): Promise<ResultType> {
    return instance.get(`${this.path}signin`, {
      params: {
        mac: 'E1:8C:24:6D:F9:85',
        email,
        password,
      },
    });
  },
  signup(name: string, email: string, password: string): Promise<ResultType> {
    return instance.post(`${this.path}signup`, {
      payload: {
        mac: 'E1:8C:24:6D:F9:85',
        name,
        email,
        password,
      },
    });
  },
  me(): Promise<ResultType> {
    return instance.get(`${this.path}me`, {
      params: {
        mac: 'E1:8C:24:6D:F9:85',
      },
    });
  },
  refresh(): Promise<ResultType> {
    return instance.get(`${this.path}refresh`, {
      params: {
        mac: 'E1:8C:24:6D:F9:85',
      },
    });
  },
};
