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
    throw new Error(err.error);
  }
};

export const deletePrompt = async (id: string) => {
  try {
    return await axiosClientProtected.delete(
      `${libraryRoutes.DELETE_PROMPT}${id}/`
    );
  } catch (err: any) {
    throw new Error(err.error);
  }
};

export const getPromptInfo = async (id: string) => {
  try {
    return await axiosClientProtected.get(`${libraryRoutes.GET_PROMPT}${id}/`);
  } catch (err: any) {
    throw new Error(err.error);
  }
};

export const getSearchPrompts = async (
  page: number = 1,
  input: string,
  favourite?: boolean,
  controller?: AbortController
) => {
  try {
    const url = `${libraryRoutes.SEARCH_PROMPT}${page}&q=${input}${
      favourite ? '&favourite=true' : ''
    }`;
    return await axiosClientProtected.get(url);
  } catch (err: any) {
    throw new Error(err.error);
  }
};

export const updatePromptInfo = async (update: any, id: string) => {
  try {
    return await axiosClientProtected.patch(
      `${libraryRoutes.UPDATE_PROMPT}${id}/`,
      update
    );
  } catch (err: any) {
    throw new Error(err.error);
  }
};
