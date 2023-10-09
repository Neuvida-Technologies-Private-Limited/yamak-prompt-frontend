import { AxiosError } from 'axios';
import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { workspaceRoutes } from './routes';
import {
  CreateWorkspaceModal,
  GenerateOutputModal,
  PublishPromptModal,
} from './types';

export const GetWorkspaces = async () => {
  try {
    const response = await axiosClientProtected.get(
      workspaceRoutes.GET_WORKSPACES_ROUTE
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const CreateWorkspace = async (model: CreateWorkspaceModal) => {
  try {
    const response = await axiosClientProtected.post(
      workspaceRoutes.CREATE_WORKSPACE_ROUTE,
      model
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const getWorkspace = async (id: string | undefined) => {
  try {
    const res = await axiosClientProtected.get(
      `${workspaceRoutes.GET_WORKSPACE_INFO_ROUTE}/${id}/`
    );

    return res.data;
  } catch (error: any) {
    return error;
  }
};
export const DeleteWorkspace = async (id: string) => {
  await axiosClientProtected
    .delete(`${workspaceRoutes.DELETE_WORKSPACE_ROUTE}${id}/`)
    .then(response => {})
    .catch((error: AxiosError) => {
      return Promise.reject(error);
    });
};
export const GenerateOutput = async (modal: GenerateOutputModal) => {
  try {
    const response = await axiosClientProtected.post(
      workspaceRoutes.GENERATE_OUTPUT_ROUTE,
      modal
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
export const GetWorkspaceHistory = async (id: string | undefined) => {
  try {
    const response = await axiosClientProtected.get(
      `${workspaceRoutes.GET_WORKSPACE_HISTORY_ROUTE}/${id}/`
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
export const UpdateWorkspace = async (update: any, id: string) => {
  try {
    const response = await axiosClientProtected.patch(
      `${workspaceRoutes.UPDATE_WORKSPACE_ROUTE}${id}/`,
      update
    );
    return response.status;
  } catch (err: any) {
    return Promise.reject(err);
  }
};
export const PublishPromptWorkspace = async (modal: PublishPromptModal) => {
  try {
    const response = await axiosClientProtected.post(
      workspaceRoutes.PUBLISH_PROMPT_ROUTE,
      modal
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
export const getSearchWorkspaceHistory = async (
  id: string,
  input: string,
  controller?: AbortController
) => {
  try {
    const res = await axiosClientProtected.get(
      `${workspaceRoutes.SEARCH_HISTORY_ROUTE}${id}/&q=${input}`,
      { signal: controller?.signal }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
