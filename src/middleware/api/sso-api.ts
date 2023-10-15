import axios, { AxiosError } from 'axios';

import axiosClient from 'middleware/axios/axios-client/axios-client-public';
import { SSOLoginModel } from './types';
import { SSORoutes } from './routes';
import { GetStorage, SetStorage } from 'middleware/cache';
import { TOKENS } from 'utils/constants';

export const GoogleGetProfile = async (access_token: string) => {
  try {
    const res = await axios.get(
      `${SSORoutes.GET_GOOGLE_PROFILE_ROUTE}${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return error;
  }
};
export const SSOLogIn = async (model: SSOLoginModel) => {
  try {
    const res = await axiosClient.post(SSORoutes.SSO_LOGIN_ROUTE, model);

    const response = res.data;

    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    // Set token in localstorage
    SetStorage(TOKENS.ACCESS_TOKEN, access_token);
    SetStorage(TOKENS.REFRESH_TOKEN, refresh_token);

    return res;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
