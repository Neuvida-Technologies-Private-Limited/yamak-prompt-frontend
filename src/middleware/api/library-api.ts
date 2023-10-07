import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { libraryRoutes } from './routes';

export const getAllPrompts = async (page: number) => {
  try {
    const res: any = await axiosClientProtected.get(
      `${libraryRoutes.GET_PROMPTS}${page}`
    );

    // console.log(res);
    // if (res.status_code !== 200) throw new Error(res.error);
    return res;
  } catch (err: any) {
    throw new Error(err.error);
  }
};

export const createPrompt = async (prompt: any) => {
  try {
    return await axiosClientProtected.post(libraryRoutes.CREATE_PROMPT, prompt);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deletePrompt = async (id: string) => {
  try {
    return await axiosClientProtected.delete(
      `${libraryRoutes.DELETE_PROMPT}${id}/`
    );
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getPromptInfo = async (id: string) => {
  try {
    return await axiosClientProtected.get(`${libraryRoutes.GET_PROMPT}${id}/`);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getSearchPromptInfo = async (
  input: string,
  controller?: AbortController
) => {
  try {
    return await axiosClientProtected.get(
      `${libraryRoutes.SEARCH_PROMPT}${input}`,
      { signal: controller?.signal }
    );
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updatePromptInfo = async (update: any, id: string) => {
  try {
    return await axiosClientProtected.patch(
      `${libraryRoutes.UPDATE_PROMPT}${id}/`,
      update
    );
  } catch (err: any) {
    throw new Error(err);
  }
};
