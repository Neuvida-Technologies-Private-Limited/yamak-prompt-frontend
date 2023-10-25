import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { CreateKeyModal, TestConnectionModal } from './types';
import { keyManagementRoutes } from './routes';

export const getLLMProviders = async () => {
  try {
    const response = await axiosClientProtected.get(
      keyManagementRoutes.LLM_PROVIDERS
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.error);
  }
};
export const createKey = async (model: CreateKeyModal) => {
  try {
    return await axiosClientProtected.post(
      keyManagementRoutes.CREATE_KEY_ROUTE,
      model
    );
  } catch (err: any) {
    throw new Error(err.error);
  }
};
export const getKeyList = async (page: number, itemsPerPage: number) => {
  try {
    const response = await axiosClientProtected.get(
      `${keyManagementRoutes.KEY_LIST_ROUTE}${page}&page_size=${itemsPerPage}`
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.error);
  }
};

export const getSearchKeys = async (
  page: number,
  input: string,
  itemsPerPage: number
) => {
  try {
    const response = await axiosClientProtected.get(
      `${keyManagementRoutes.KEY_LIST_ROUTE}${page}&q=${input}&page_size=${itemsPerPage}`
    );
    return response;
  } catch (err: any) {
    throw new Error(err.error);
  }
};

export const deleteKey = async (uuid: string) => {
  try {
    await axiosClientProtected.delete(
      `${keyManagementRoutes.DELETE_KEY_ROUTE}${uuid}/`
    );
  } catch (err: any) {
    throw new Error(err.error);
  }
};
export const testConnection = async (model: TestConnectionModal) => {
  try {
    const response = await axiosClientProtected.post(
      keyManagementRoutes.TEST_CONNECTION_ROUTE,
      model
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.error);
  }
};
