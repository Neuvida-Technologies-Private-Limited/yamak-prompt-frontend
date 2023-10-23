import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, Menu, Space } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { FiKey, FiLayout, FiSend, FiLogOut } from 'react-icons/fi';
import { GoStack } from 'react-icons/go';
import { MdOutlineSubject } from 'react-icons/md';

import Button from '../button';
import { SetStorage } from 'middleware/cache';
import { Paths, SidebarConst, TOKENS } from 'utils/constants';
import { BsHddStack } from 'react-icons/bs';

interface LinkItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  disabled?: boolean;
}

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

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    SetStorage(TOKENS.ACCESS_TOKEN, '');
    SetStorage(TOKENS.REFRESH_TOKEN, '');
    navigate('/');
  }

  function handleFeedback() {
    window.open('https://forms.gle/BMLEm7QYyngN3yXdA', '_blank');
  }

  return (
    <>
      <Button
        variant="default"
        onClick={() => setOpen(true)}
        icon={<HiOutlineMenuAlt1 className="!w-6 !h-full text-black" />}
      />
      <Drawer
        placement={'left'}
        width={300}
        onClose={() => setOpen(false)}
        open={open}
        extra={<Space></Space>}
      >
        <Menu
          defaultSelectedKeys={[pathname]}
          mode="inline"
          onClick={item => {
            if (item.key === Paths.Feedback) {
              handleFeedback();
            } else {
              navigate(item.key);
            }
            setOpen(false);
          }}
          className="font-raleway text-xs !border-none"
        >
          <span className="flex font-poppins pl-5 pt-4 font-bold text-gray600">
            {SidebarConst.General}
          </span>

          {/* General items */}
          {generalItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
              {item.label}
            </Menu.Item>
          ))}

          <span className="flex font-poppins pl-5 pt-4 font-bold text-gray600">
            {SidebarConst.Support}
          </span>

          {/* Support items */}
          {supportItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
              {item.label}
            </Menu.Item>
          ))}

          <Menu.Item key="/" icon={<FiLogOut />} onClick={handleLogout}>
            {SidebarConst.Logout}
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default App;
