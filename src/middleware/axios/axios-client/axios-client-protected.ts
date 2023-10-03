import axios, { AxiosResponse, AxiosError } from 'axios';
import { REFRESH_ACCESS_TOKEN } from 'middleware/api';
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

// Response interceptor for API calls
axiosClientProtected.interceptors.response.use(
  response => {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status_code === 401) {
      const access_token = await REFRESH_ACCESS_TOKEN();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosClientProtected(originalRequest);
    }
    return Promise.reject(error.response?.data);
  }
);

export default axiosClientProtected;
