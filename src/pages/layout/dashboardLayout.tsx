import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Content } from 'antd/es/layout/layout';
import { Layout } from 'antd';

import { DesktopSidebar, MobileNavbar } from 'components/common';
import { currentUserState } from 'middleware/state';
import { GetCurrentUser } from 'middleware/api';

const DashboardLayout: React.FC = () => {
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await GetCurrentUser();
        if (res.status === 200) {
          setCurrentUserState(old => ({
            ...old,
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
          }));
        }
      } catch (error) {}
    };
    getData();
  }, [setCurrentUserState]);

  return (
    <Layout>
      <MobileNavbar />
      <Layout hasSider>
        <DesktopSidebar />
        <Content className="bg-white !max-h-screen  overflow-y-scroll">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
