import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

import { Button } from 'components/common';
import { ButtonVariants, LoginConst } from 'utils/constants';
import { GoogleGetProfile, SSOLogIn } from 'middleware/api';

type TokenResponse = any;

type CodeResponse = Omit<
  TokenResponse,
  'error' | 'error_description' | 'error_uri'
>;

const GoogleAuth = () => {
  const navigate = useNavigate();

  const googleAuth = useGoogleLogin({
    onSuccess: (codeResponse: CodeResponse) => {
      GoogleLogin(codeResponse);
    },
    onError: error => console.log('Login Failed:', error),
  });

  const GoogleLogin = async (codeResponse: CodeResponse) => {
    const res = await GoogleGetProfile(codeResponse.access_token);
    const loginSSOParams = {
      first_name: res.given_name,
      last_name: res.family_name,
      email: res.email,
      access_token: codeResponse.access_token,
    };
    try {
      const response = await SSOLogIn(loginSSOParams);
      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <Button
        size={'middle'}
        type={'default'}
        onClick={() => googleAuth()}
        icon={<FcGoogle />}
        name={LoginConst.SignIn}
        variant={ButtonVariants.OUTLINED}
      />
    </div>
  );
};

export default GoogleAuth;
