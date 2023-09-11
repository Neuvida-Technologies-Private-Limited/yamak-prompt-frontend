import React from 'react';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Layout } from 'antd';
import { Navbar, Sidebar } from 'components/common';

const dashboardLayout: React.FC = () => {
  return (
    <Layout>
      <Layout hasSider>
        <Sidebar />
        <Content className="bg-white">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default dashboardLayout;
