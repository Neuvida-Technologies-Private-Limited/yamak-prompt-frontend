import axiosClientProtected from 'middleware/axios/axios-client/axios-client-protected';
import { libraryRoutes } from './routes';

export const getAllPrompts = async () =>
  await axiosClientProtected.get(libraryRoutes.GET_PROMPTS);
