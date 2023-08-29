import React from 'react';
import { Navbar, Sidebar } from 'components/common';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Layout } from 'antd';

const dashboardLayout: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Layout className="h-screen" hasSider>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default dashboardLayout;
