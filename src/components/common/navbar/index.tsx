import React from 'react';
import { Layout } from 'antd';

import { IconPaths } from 'utils/constants';
import MobileSidebar from '../sidebar/mobileSidebar';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar em:hidden sm:flex w-full sticky top-0 z-50 opacity-95">
      <Layout>
        <Layout.Header className="nav-header bg-primary50 w-full flex items-center border-b border-primary50 px-6">
          <div className="logo flex items-center justify-between w-full">
            <MobileSidebar />
            <div className="flex justify-center">
              <img src={IconPaths.LOGO} alt="logo" className="w-10" />
              <img src={IconPaths.YAMAK} alt="yamak" className="" />
            </div>
            <div className="flex justify-end"></div>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
