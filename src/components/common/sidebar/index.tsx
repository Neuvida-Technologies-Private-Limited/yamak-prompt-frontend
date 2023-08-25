import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  GroupOutlined,
  KeyOutlined,
  LayoutOutlined,
  LogoutOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
//constants
import { SidebarConst } from "../../../utils/constants";

interface LinkItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const items1: LinkItem[] = [
  { key: "/library", label: "Library/Repository", icon: <AppstoreOutlined /> },
  { key: "/workspace", label: "Workspace", icon: <LayoutOutlined /> },
  { key: "/keyManagement", label: "Key Management", icon: <KeyOutlined /> },
  {
    key: "/deployment",
    label: "Deployment",
    icon: <SendOutlined />,
    disabled: true,
  },
  {
    key: "/testCases",
    label: "Test Cases",
    icon: <GroupOutlined />,
    disabled: true,
  },
];
const items2: LinkItem[] = [
  { key: "/profile", label: "Ekta Sharma", icon: <UserOutlined /> },
  { key: "/logout", label: "Logout", icon: <LogoutOutlined /> },
];

const { Sider } = Layout;

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="h-screen border-r border-gray-300"
      >
        <span className="flex font-poppins pl-5 pt-4 font-bold text-gray-500">
          {SidebarConst.Menu}
        </span>
        <div className="flex justify-between flex-col h-full">
          <Menu
            defaultSelectedKeys={["/library"]}
            mode="inline"
            onClick={(item) => {
              navigate(item.key);
            }}
            items={items1}
            className="font-raleway text-xs"
          />
          <Menu
            mode="inline"
            className="menu2 font-raleway text-xs mb-14 "
            items={items2}
          />
        </div>
      </Sider>
  );
};

export default Index;
