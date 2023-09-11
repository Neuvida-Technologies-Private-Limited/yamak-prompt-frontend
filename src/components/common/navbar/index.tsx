import React from 'react';
import { Layout } from 'antd';
import { IconPaths } from 'utils/constants';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header bg-white flex justify-between items-center border-b border-gray-300 sm:px-4 md:px-6">
          <div className="logo flex">
            <img src={IconPaths.LOGO} alt="logo" className="" />
            <img src={IconPaths.YAMAK} alt="yamak" className="" />
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
