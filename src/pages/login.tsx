import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Heading, Input } from 'components/common';
import { LogIn } from 'middleware/api/auth-api';
import { LoginConst } from 'utils/constants';
import { loginState } from 'middleware/state';
import {
  isUsernameValidated,
  isPasswordValidated,
  isLoginFormValidated,
} from 'utils/validations';
import { GoogleAuth } from 'components/helpers';

const handleClick = () => {};

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(loginState);
  // destructuring params
  const { username, usernameError, password, passwordError } = state;

  const handleUsernameChange = (username: string) => {
    // update the email value
    setState(old => ({
      ...old,
      username,
      usernameError: isUsernameValidated(username),
    }));
  };
  const handlePasswordChange = (password: string) => {
    // update the password value
    setState(old => ({
      ...old,
      password,
      passwordError: isPasswordValidated(password),
    }));
  };
  const InputFields = [
    {
      id: '1',
      label: 'Username',
      type: 'text',
      name: 'username',
      placeholder: 'Enter Username',
      onchange: handleUsernameChange,
      value: username,
      error: usernameError,
    },
    {
      id: '2',
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: 'Enter Password',
      onchange: handlePasswordChange,
      value: password,
      error: passwordError,
    },
  ];

  const resetLoginState = useResetRecoilState(loginState);

  const submitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // start the loading
    setState(old => ({
      ...old,
      isLoading: true,
      usernameError: isUsernameValidated(username),
      passwordError: isPasswordValidated(password),
    }));

    const loginParams = {
      username,
      password,
    };

    if (!isLoginFormValidated(username, password)) {
      return;
    }

    try {
      await LogIn(loginParams);
      navigate('/home');
      resetLoginState();
    } catch (error: any) {
      toast.warn('Invalid User');
    }

    // end the loading
    setState(old => ({
      ...old,
      isLoading: false,
    }));
  };

  return (
    <div className="flex md:h-screen items-center justify-center">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:w-3/5 em:w-4/5 sm:w-full m-4 border">
        <div className="flex flex-col items-center justify-start m-4 rounded-xl bg-primary sm:order-2 md:order-1">
          <img src="/assets/images/loginBanner.svg" alt="" className=" w-4/5" />
          <div className="flex justify-center font-poppins text-center text-gray50 sm:px-4 em:px-12 w-full">
            {LoginConst.Banner_Desc}
          </div>
        </div>
        <div className="flex flex-col sm:items-center md:items-start justify-center sm:p-4 md:p-8 gap-4 sm:order-1 md:order-2">
          <img src="/assets/logo/stealth-logo.svg" alt="" />
          <Heading
            level={1}
            children={LoginConst.Welcome}
            className="font-poppins"
          />

          <p className="font-poppins text-gray400 sm:text-center md:text-start">
            {LoginConst.Login_Desc}
          </p>

          <GoogleAuth />

          <form
            className="flex flex-col font-poppins border rounded-lg w-full border-gray00 p-4 h-full"
            action="#"
            method="POST"
            onSubmit={submitHandler}
          >
            {InputFields.map(item => (
              <>
                <label className="font-semibold pb-2">{item.label}</label>
                <Input
                  id={item.id}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={item.onchange}
                  value={item.value}
                  variant={'filled'}
                  error={item.error}
                />
              </>
            ))}
            <Button
              variant="primary"
              size="large"
              className="bg-primary justify-center flex"
              name={LoginConst.LogIn}
              htmlType="submit"
            />
          </form>
          {/* Google button  */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
