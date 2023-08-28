import axios, { AxiosResponse, AxiosError } from 'axios';
import { GetStorage } from '../../cache';
import { TOKENS } from '../../../utils/constants';

// Axios client for protected APIs
const axiosClientCreateTicketProtected = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  }
});
// Add a request interceptor
axiosClientCreateTicketProtected.interceptors.request.use(
  function (config) {
    // Do something before sending the request
    const token = `Bearer ${GetStorage(TOKENS.ACCESS_TOKEN)}`;
    config.headers.Authorization =  token;
    return config;
  },
  function (error: AxiosError) {
    // Do something with the request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosClientCreateTicketProtected.interceptors.response.use(
  function (response: AxiosResponse) {
    // Do something with the response data
     return response.data
  },
  function (error: AxiosError) {
    // Do something with the response error
    return Promise.reject(error.response?.data);
  }
);

export default axiosClientCreateTicketProtected
