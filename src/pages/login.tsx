import { FcGoogle } from 'react-icons/fc';
import { Button, Heading, Input } from 'components/common';
import { LoginConst } from 'utils/constants';

const handleClick = () => {};
const handleChange = () => {};

const InputFields = [
  {
    id: '1',
    label: 'Username',
    name: 'username',
    placeholder: 'Enter Username',
    onchange: handleChange,
  },
  {
    id: '2',
    label: 'Password',
    name: 'password',
    placeholder: 'Enter Password',
    onchange: handleChange,
  },
];

const login = () => {
  return (
    <div className="flex md:h-screen items-center justify-center">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:w-3/5 em:w-4/5 sm:w-full m-4 md:h-2/3 border">
        <div className="flex flex-col items-center justify-start m-4 rounded-xl bg-primary sm:order-2 md:order-1">
          <img src="/assets/images/loginBanner.svg" alt="" className=" w-4/5" />
          <div className="flex justify-center font-poppins text-center text-gray50 sm:px-4 em:px-12 w-full">
            {LoginConst.Banner_Desc}
          </div>
        </div>
        <div className="flex flex-col sm:items-center md:items-start justify-center sm:p-4 md:p-8 gap-4 sm:order-1 md:order-2">
          <img src="/assets/logo/stealth-logo.svg" alt="" />
          <Heading
            variant={'mainHeading'}
            children={LoginConst.Welcome}
            className="font-poppins"
          />

          <p className="font-poppins text-gray400 sm:text-center md:text-start">
            {LoginConst.Login_Desc}
          </p>

          <form
            className="flex flex-col font-poppins border rounded-lg w-full border-gray00 p-4 h-full"
            action="#"
            method="POST"
          >
            {InputFields.map(item => (
              <>
                <label className="font-semibold pb-2">{item.label}</label>
                <Input
                  id={item.id}
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={item.onchange}
                  variant={'filled'}
                />
              </>
            ))}
            <Button
              type="primary"
              shape="default"
              size="large"
              onClick={handleClick}
              className="bg-primary justify-center flex"
              name={LoginConst.LogIn}
            />
          </form>
          {/* Google button  */}
          {/* <Button
            size={undefined}
            type={'default'}
            shape={undefined}
            onClick={handleClick}
            icon={<FcGoogle />}
            name={LoginConst.SignIn}
            className="em:px-12 sm:px-4 em:h-12 sm:text-sm em:text-lg text-gray500 font-medium border-2 rounded-lg"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default login;
