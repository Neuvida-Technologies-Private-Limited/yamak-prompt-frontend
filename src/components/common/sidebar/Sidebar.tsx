import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FiKey, FiLayout, FiSend, FiLogOut } from 'react-icons/fi';
import { GoStack } from 'react-icons/go';
import { BsHddStack } from 'react-icons/bs';
import { MdOutlineSubject } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';

import { Paths, SidebarConst, TOKENS } from 'utils/constants';
import { SetStorage } from 'middleware/cache';

interface LinkItem {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const { Sider } = Layout;

const generalItems: LinkItem[] = [
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

const supportItems: LinkItem[] = [
  {
    key: Paths.Feedback,
    label: SidebarConst.Feedback,
    icon: <MdOutlineSubject />,
  },
  {
    key: Paths.Profile,
    label: 'User',
    icon: <AiOutlineUser />,
    disabled: true,
  },
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    SetStorage(TOKENS.ACCESS_TOKEN, '');
    SetStorage(TOKENS.REFRESH_TOKEN, '');
    navigate('/');
  }

  function handleFeedback() {
    window.open('https://forms.gle/BMLEm7QYyngN3yXdA', '_blank');
  }

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      className="desktop h-screen border-r-2 em:block sm:hidden border-gray50 !sticky !top-0 !left-0"
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

      <Menu
        defaultSelectedKeys={[pathName]}
        selectedKeys={[pathName]}
        mode="inline"
        onClick={item => {
          item.key === Paths.Feedback ? handleFeedback() : navigate(item.key);
        }}
        className="font-raleway text-xs"
      >
        <span className={'flex font-poppins pl-4 py-2 font-bold text-gray600'}>
          {SidebarConst.General}
        </span>

        {/* general items */}
        {generalItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
            {item.label}
          </Menu.Item>
        ))}

        <span className={'flex font-poppins pl-4 py-2 font-bold text-gray600'}>
          {SidebarConst.Support}
        </span>

        {/* support items */}
        {supportItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
            {item.label}
          </Menu.Item>
        ))}

        {/* logout button */}
        <Menu.Item key="/" icon={<FiLogOut />} onClick={handleLogout}>
          {SidebarConst.Logout}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Index;
