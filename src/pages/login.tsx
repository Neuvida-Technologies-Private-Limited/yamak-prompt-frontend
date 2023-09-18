import { FcGoogle } from 'react-icons/fc';
import { Button, Heading } from 'components/common';
import { LoginConst } from 'utils/constants';

const handleClick = () => {};

const login = () => {
  return (
    <div className="flex h-screen items-center justify-center overflow-y-scroll">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:w-3/5 em:w-4/5 sm:w-full m-4 md:h-2/3 sm:h-full border">
        <div className="flex flex-col items-center justify-start m-4 rounded-xl bg-primary">
          <img src="/assets/images/loginBanner.svg" alt="" className=" w-4/5" />
          <div className="flex justify-center font-poppins text-center text-gray50 sm:px-4 em:px-12 w-full">
            {LoginConst.Banner_Desc}
          </div>
        </div>
        <div className="flex flex-col sm:items-center md:items-start justify-center p-8 gap-4">
          <img src="/assets/logo/stealth-logo.svg" alt="" />
          <Heading
            variant={'mainHeading'}
            children={LoginConst.Welcome}
            className="font-poppins"
          />

          <p className="font-poppins text-gray400 sm:text-center md:text-start">
            {LoginConst.Login_Desc}
          </p>
          <Button
            size={undefined}
            type={'default'}
            shape={undefined}
            onClick={handleClick}
            icon={<FcGoogle />}
            name={LoginConst.SignIn}
            className="em:px-12 sm:px-4 em:h-12 sm:text-sm em:text-lg text-gray500 font-medium border-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default login;
