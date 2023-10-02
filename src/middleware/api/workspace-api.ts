import { AxiosError } from 'axios';
import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { workspaceRoutes } from './routes';
import { CreateWorkspaceModal } from './types';

export const GetWorkspaces = async () => {
  try {
    const response = await axiosClientProtected.get(
      workspaceRoutes.GET_WORKSPACE_ROUTE
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

export const getWorkspace = async (id: string | undefined) => {
  try {
    const res = await axiosClientProtected.get(
      `${workspaceRoutes.GET_WORKSPACE}/${id}/`
    );

    return res.data;
  } catch (error: any) {
    return error;
  }
};
