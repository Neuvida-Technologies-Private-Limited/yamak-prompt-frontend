import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Menu, Space } from 'antd';
// react icons
import { AiOutlineMenuUnfold, AiOutlineUser } from 'react-icons/ai';
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
//components
import Button from '../button';
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

const App: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size={undefined}
        variant="default"
        onClick={showDrawer}
        icon={<AiOutlineMenuUnfold className="!w-6 !h-full text-black" />}
      />
      <Drawer
        placement={'left'}
        width={500}
        onClose={onClose}
        open={open}
        extra={<Space></Space>}
      >
        <span className="flex font-poppins pl-5 pt-4 font-bold text-gray600">
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
          <span className="flex font-poppins pl-5 pt-4 font-bold text-gray600">
            {SidebarConst.Support}
          </span>
          {items.slice(5, 9).map(item => (
            <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default App;
