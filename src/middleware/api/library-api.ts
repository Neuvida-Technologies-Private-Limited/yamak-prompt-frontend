import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { libraryRoutes } from './routes';

export const getAllPrompts = async () => {
  try {
    return await axiosClientProtected.get(libraryRoutes.GET_PROMPTS);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createPrompt = async (prompt: any) => {
  try {
    return await axiosClientProtected.post(libraryRoutes.CREATE_PROMPT, prompt);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePrompt = async (id: string) => {
  try {
    return await axiosClientProtected.delete(
      `${libraryRoutes.DELETE_PROMPT}${id}/`
    );
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPromptInfo = async (id: string) => {
  try {
    return await axiosClientProtected.get(`${libraryRoutes.GET_PROMPT}${id}/`);
  } catch (err) {
    return Promise.reject(err);
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
  } catch (err) {
    return Promise.reject(err);
  }
};
