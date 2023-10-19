import { AxiosError } from 'axios';
import axiosClient from 'middleware/axios/axios-client/axios-client-public';
import { LoginModel, RefreshModal } from './types';
import { authRoutes } from './routes';
import { SetStorage } from 'middleware/cache';
import { TOKENS } from 'utils/constants';
import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';

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
export const REFRESH_ACCESS_TOKEN = async (model: RefreshModal) => {
  try {
    const res = await axiosClient.post(
      authRoutes.REFRESH_ACCESS_TOKEN_ROUTE,
      model
    );
    const response = res.data;
    const access_token = response.data.access_token;
    SetStorage(TOKENS.ACCESS_TOKEN, access_token);
    return access_token;
  } catch (error: any) {
    return Promise.reject(error);
  }
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
//Current User
export const GetCurrentUser = async () => {
  try {
    const res: any = await axiosClientProtected.get(
      authRoutes.CURRENT_USER_ROUTE
    );
    return res;
  } catch (error: any) {
    return error;
  }
};
