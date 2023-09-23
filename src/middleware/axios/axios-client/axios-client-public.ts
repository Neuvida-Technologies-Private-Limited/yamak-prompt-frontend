import axios, { AxiosResponse, AxiosError } from 'axios';

// Axios client for open APIs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before sending the request
    return config;
  },
  function (error: AxiosError) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Do something with the response data
    return response;
  },
  function (error: AxiosError) {
    // Do something with the response error
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
