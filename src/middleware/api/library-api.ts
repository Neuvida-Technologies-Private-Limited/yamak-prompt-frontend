import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { libraryRoutes } from './routes';

export const getAllPrompts = async (page: number) => {
  try {
    const res: any = await axiosClientProtected.get(
      `${libraryRoutes.GET_PROMPTS}${page}`
    );
    return res;
  } catch (err: any) {
    throw new Error(err.error);
  }
};

export const getAllFavouritePrompts = async (page: number) => {
  try {
    const res: any = await axiosClientProtected.get(
      `${libraryRoutes.GET_FAVOURITE_PROMPTS}${page}`
    );
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
  page: number,
  input: string,
  controller?: AbortController
) => {
  try {
    return await axiosClientProtected.get(
      `${libraryRoutes.SEARCH_PROMPT}${page}&q=${input}`,
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
