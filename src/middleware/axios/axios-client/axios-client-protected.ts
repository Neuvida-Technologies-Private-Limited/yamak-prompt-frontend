import axios, { AxiosResponse, AxiosError } from 'axios';
import { GetStorage } from 'middleware/cache';
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

// Add a response interceptor
axiosClientProtected.interceptors.response.use(
  function (response: AxiosResponse) {
    // Do something with the response data
    return response;
  },
  function (error: AxiosError) {
    // Do something with the response error
    return Promise.reject(error.response?.data);
  }
);

export default axiosClientProtected;
