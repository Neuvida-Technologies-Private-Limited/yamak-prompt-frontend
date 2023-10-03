import { AxiosError } from 'axios';
import axiosClient from 'middleware/axios/axios-client/axios-client-public';
import { LoginModel } from './types';
import { authRoutes } from './routes';
import { GetStorage, SetStorage } from 'middleware/cache';
import { TOKENS } from 'utils/constants';

//CSRF Token
export const CSRF_TOKEN = async () => {
  await axiosClient
    .get(authRoutes.CSRF_TOKEN_ROUTE)
    .then(response => {
      // extraxt token
      const csrf_token = response.data.csrfToken;

      // set token in local storage
      SetStorage(TOKENS.CSRF_TOKEN, csrf_token);
    })
    .catch((error: AxiosError) => {
      return Promise.reject(error);
    });
};

//Refresh Token
export const REFRESH_ACCESS_TOKEN = async () => {
  const refresh_token = GetStorage(TOKENS.REFRESH_TOKEN);
  await axiosClient
    .post(authRoutes.REFRESH_ACCESS_TOKEN_ROUTE, refresh_token)
    .then(response => {
      const access_token = response.data.access_token;

      SetStorage(TOKENS.ACCESS_TOKEN, access_token);
      return access_token;
    })
    .catch((error: AxiosError) => {
      return Promise.reject(error);
    });
};

// login
export const LogIn = async (model: LoginModel) => {
  await axiosClient
    .post(authRoutes.LOGIN_ROUTE, model)
    .then(res => {
      const response = res.data;
      // Extract tokens
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      // Set token in localstorage
      SetStorage(TOKENS.ACCESS_TOKEN, access_token);
      SetStorage(TOKENS.REFRESH_TOKEN, refresh_token);
    })
    .catch((error: AxiosError) => {
      return Promise.reject(error);
    });
};
