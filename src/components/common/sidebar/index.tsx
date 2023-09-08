import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiKey, FiLayout, FiSend, FiLogOut } from 'react-icons/fi';
import { GoStack } from 'react-icons/go';
import { BsHddStack } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

import { Layout, Menu } from 'antd';
//constants
import { Paths, SidebarConst } from '../../../utils/constants';

interface LinkItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const ApplicationModules: LinkItem[] = [
  {
    key: Paths.Home,
    label: SidebarConst.Library,
    icon: <GoStack />,
  },
  {
    key: Paths.Workspace,
    label: SidebarConst.Workspace,
    icon: <FiLayout />,
  },
  {
    key: Paths.KeyManagement,
    label: SidebarConst.KeyManagement,
    icon: <FiKey />,
  },
  {
    key: Paths.Deployment,
    label: SidebarConst.Deployment,
    icon: <FiSend />,
    disabled: true,
  },
  {
    key: Paths.TestCases,
    label: SidebarConst.TestCases,
    icon: <BsHddStack />,
    disabled: true,
  },
];
const Profile: LinkItem[] = [
  { key: Paths.Profile, label: SidebarConst.Profile, icon: <AiOutlineUser /> },
  { key: '/', label: SidebarConst.Logout, icon: <FiLogOut /> },
];

const { Sider } = Layout;

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      className="h-screen border-r border-gray-300"
    >
      <span className="flex font-poppins pl-5 pt-4 font-bold text-gray600">
        {SidebarConst.General}
      </span>
      <div className="flex justify-between flex-col h-full">
        <Menu
          defaultSelectedKeys={[Paths.Home]}
          mode="inline"
          onClick={item => {
            navigate(item.key);
          }}
          items={ApplicationModules}
          className="font-raleway text-xs"
        />
        <Menu
          mode="inline"
          className="menu2 font-raleway text-xs mb-14"
          onClick={item => {
            navigate(item.key);
          }}
          items={Profile}
        />
      </div>
    </Sider>
  );
};

export default Index;
