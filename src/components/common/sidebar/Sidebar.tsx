import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { Paths, SidebarConst, TOKENS } from 'utils/constants';
import { SetStorage } from 'middleware/cache';
import { useRecoilState } from 'recoil';
import { currentUserState } from 'middleware/state';

interface LinkItem {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const { Sider } = Layout;

const Index: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);

  const { email, first_name, last_name } = currentUser;

  const items: LinkItem[] = [
    {
      key: Paths.Home,
      label: SidebarConst.Library,
      icon: <GoStack />,
    },
    {
      key: Paths.Workspace,
      label: SidebarConst.Workspaces,
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
    {
      key: Paths.Feedback,
      label: SidebarConst.Feedback,
      icon: <MdOutlineSubject />,
    },
    {
      key: Paths.Profile,
      label: `${first_name + ' ' + last_name}`,
      icon: <AiOutlineUser />,
      disabled: true,
    },
  ];

  const handleLogout = () => {
    // Remove the access token from local storage
    SetStorage(TOKENS.ACCESS_TOKEN, '');
    SetStorage(TOKENS.REFRESH_TOKEN, '');
    navigate('/');
  };
  const handleFeedback = () => {
    window.open('https://forms.gle/BMLEm7QYyngN3yXdA', '_blank');
  };
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
        defaultSelectedKeys={[pathName]}
        selectedKeys={[pathName]}
        mode="inline"
        onClick={item => {
          if (item.key === Paths.Feedback) {
            handleFeedback();
          } else {
            navigate(item.key);
          }
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
              ? 'flex font-poppins pl-5 py-4 font-bold text-gray600'
              : 'flex font-poppins pl-2 py-4 font-bold text-gray600'
          }
        >
          {SidebarConst.Support}
        </span>
        {items.slice(5, 8).map(item => (
          <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
            {item.label}
          </Menu.Item>
        ))}
        <Menu.Item key="/" icon={<FiLogOut />} onClick={handleLogout}>
          {SidebarConst.Logout}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Index;
