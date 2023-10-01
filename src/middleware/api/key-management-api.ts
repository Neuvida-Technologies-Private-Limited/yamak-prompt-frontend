import { AxiosError } from 'axios';
import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { CreateKeyModal, TestConnectionModal } from './types';
import { keyManagementRoutes } from './routes';

export const GetLLMProviders = async () => {
  try {
    const response = await axiosClientProtected.get(
      keyManagementRoutes.LLM_PROVIDERS
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
export const CreateKey = async (model: CreateKeyModal) => {
  await axiosClientProtected
    .post(keyManagementRoutes.CREATE_KEY_ROUTE, model)
    .then(response => {})
    .catch((error: AxiosError) => {
      return Promise.reject(error);
    });
};
export const GetKeyList = async () => {
  try {
    const response = await axiosClientProtected.get(
      keyManagementRoutes.KEY_LIST_ROUTE
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
export const DeleteKey = async (uuid: string) => {
  await axiosClientProtected
    .delete(`${keyManagementRoutes.DELETE_KEY_ROUTE}${uuid}/`)
    .then(response => {})
    .catch((error: AxiosError) => {
      return Promise.reject(error);
    });
};
export const TestConnection = async (model: TestConnectionModal) => {
  try {
    const response = await axiosClientProtected.post(
      keyManagementRoutes.TEST_CONNECTION_ROUTE,
      model
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
