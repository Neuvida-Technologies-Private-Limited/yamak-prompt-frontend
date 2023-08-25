import React, { useState } from "react";
import { Layout, Button, Drawer } from "antd";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header bg-white flex justify-between items-center  border-b-2">
          <div className="flex justify-between w-full items-center">
            <div className="logo flex">
              <img src="/assets/logo/logo.svg" alt="" className="" />
              <img src="/assets/logo/Yamakai.svg" alt="" className="" />
            </div>
            <div className="h-full md:flex sm:hidden">
              <RightMenu
                mode={"horizontal"}
                className="gap-5 cursor-pointer border-none"
              />
            </div>
          </div>

          <div className="navbar-menu justify-center items-center  md:hidden sm:flex">
            <Button
              className="menuButton justify-center items-center"
              type="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
            <Drawer
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              className="z-99999"
            >
              <RightMenu mode={"horizontal"} className="gap-5 border-none" />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
