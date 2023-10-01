import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { libraryRoutes } from './routes';

export const getAllPrompts = async () => {
  try {
    return await axiosClientProtected.get(libraryRoutes.GET_PROMPTS);
  } catch (err) {
    return Promise.reject(err);
  }
};
