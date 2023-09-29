import React from 'react';
import { Layout } from 'antd';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { IconPaths } from 'utils/constants';
import MobileSidebar from '../sidebar/mobileSidebar';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar em:hidden sm:flex w-full">
      <Layout>
        <Layout.Header className="nav-header bg-primary50 w-full flex items-center border-b border-primary50 px-6">
          <div className="logo flex items-center justify-between w-full">
            <div className="w-1/4">
              <MobileSidebar />
            </div>
            <div className="flex w-1/2 justify-center">
              <img src={IconPaths.LOGO} alt="logo" className="w-10" />
              <img src={IconPaths.YAMAK} alt="yamak" className="" />
            </div>
            <div className="w-1/4 flex justify-end">
              <AiOutlineEllipsis className="!w-7" />
            </div>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
