import React, { useState } from "react";
import {
  AppstoreOutlined,
  GroupOutlined,
  KeyOutlined,
  LayoutOutlined,
  LogoutOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
//constants
import { SidebarConst } from "../../../utils/constants";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    disabled,
  } as MenuItem;
}

const items1: MenuItem[] = [
  getItem(SidebarConst.Library, "1", <AppstoreOutlined />),
  getItem(SidebarConst.Workspace, "2", <LayoutOutlined />),
  getItem(SidebarConst.KeyManagement, "3", <KeyOutlined />),
  getItem(SidebarConst.Deployment, "4", <SendOutlined />, true),
  getItem(SidebarConst.Cases, "5", <GroupOutlined />, true),
];
const items2: MenuItem[] = [
  getItem(SidebarConst.Profile,"6",<UserOutlined />),
  getItem(SidebarConst.Logout, "7", <LogoutOutlined />),
];

const Index: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <span className="flex font-poppins pl-5 font-bold text-gray-500">{SidebarConst.Menu}</span>
        <div className="flex justify-between flex-col h-full">
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items1}
            className="font-poppins "
          />
          <Menu mode="inline" className="menu2 font-poppins mb-10 " items={items2} />
        </div>
      </Sider>
    </Layout>
  );
};

export default Index;
