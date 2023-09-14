import React from 'react';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Layout } from 'antd';
import { DesktopSidebar, MobileNavbar } from 'components/common';

const dashboardLayout: React.FC = () => {
  return (
    <Layout>
      <MobileNavbar />
      <Layout hasSider>
        <DesktopSidebar />
        <Content className="bg-white">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default dashboardLayout;
