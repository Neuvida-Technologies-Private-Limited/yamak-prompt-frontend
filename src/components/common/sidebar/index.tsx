import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiKey,
  FiLayout,
  FiSend,
  FiLogOut,
  FiHeadphones,
} from 'react-icons/fi';
import { GoStack } from 'react-icons/go';
import { MdOutlineSubject } from 'react-icons/md';
import { BsHddStack } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

import { Layout, Menu } from 'antd';
//constants
import { Paths, SidebarConst } from 'utils/constants';

interface LinkItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const items: LinkItem[] = [
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
  { key: Paths.Help, label: SidebarConst.Help, icon: <FiHeadphones /> },
  {
    key: Paths.Feedback,
    label: SidebarConst.Feedback,
    icon: <MdOutlineSubject />,
  },
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
      className="h-screen border-r-4 border-gray50"
    >
      {!collapsed ? (
        <div className="demo-logo-vertical flex justify-center items-center p-4">
          <img src="/assets/logo/logo.svg" alt="logo" />
          <img src="/assets/logo/Yamakai.svg" alt="Yamakai" />
        </div>
      ) : (
        <div className="demo-logo-vertical flex justify-center items-center p-4">
          <img src="/assets/logo/logo.svg" alt="logo" />
        </div>
      )}
      <span
        className={
          !collapsed
            ? 'flex font-poppins pl-5 pt-4 font-bold text-gray600'
            : 'flex font-poppins pl-2 pt-4 font-bold text-gray600'
        }
      >
        {SidebarConst.General}
      </span>
      <Menu
        defaultSelectedKeys={[Paths.Home]}
        mode="inline"
        onClick={item => {
          navigate(item.key);
        }}
        className="font-raleway text-xs"
      >
        {items.slice(0, 5).map(item => (
          <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
            {item.label}
          </Menu.Item>
        ))}
        <span
          className={
            !collapsed
              ? 'flex font-poppins pl-5 pt-4 font-bold text-gray600'
              : 'flex font-poppins pl-2 pt-4 font-bold text-gray600'
          }
        >
          {SidebarConst.Support}
        </span>
        {items.slice(5, 9).map(item => (
          <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Index;
