import { Outlet, Navigate } from 'react-router-dom';
import { TOKENS } from 'utils/constants';
import { GetStorage } from 'middleware/cache';

const useAuth = () => {
  // get the token
  const access_token: string | null = GetStorage(TOKENS.ACCESS_TOKEN);

  if (access_token) {
    return {
      auth: true,
    };
  } else {
    return {
      auth: false,
    };
  }
};

const ProtectedRoutes = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
