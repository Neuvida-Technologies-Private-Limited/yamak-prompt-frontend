import axios, { AxiosResponse, AxiosError } from 'axios';
import { REFRESH_ACCESS_TOKEN } from 'middleware/api';
import { GetStorage, SetStorage } from 'middleware/cache';
import { TOKENS } from 'utils/constants';

// Axios client for protected APIs
const axiosClientProtected = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClientProtected.interceptors.request.use(
  function (config) {
    // Do something before sending the request
    const token = `Bearer ${GetStorage(TOKENS.ACCESS_TOKEN)}`;
    const csrfToken = GetStorage(TOKENS.CSRF_TOKEN);

    config.headers.Authorization = token;
    config.headers['X-Csrftoken'] = csrfToken;

    return config;
  },
  function (error: AxiosError) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosClientProtected.interceptors.response.use(
  response => {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      SetStorage(TOKENS.ACCESS_TOKEN, '');
      const refresh_token = GetStorage(TOKENS.REFRESH_TOKEN);

      await REFRESH_ACCESS_TOKEN({
        refresh: refresh_token,
      });
      const access_token = GetStorage(TOKENS.ACCESS_TOKEN);

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      originalRequest.headers['Authorization'] = 'Bearer ' + access_token;

      return axiosClientProtected(originalRequest);
    }
    return Promise.reject(error.response?.data);
  }
);

export default axiosClientProtected;
