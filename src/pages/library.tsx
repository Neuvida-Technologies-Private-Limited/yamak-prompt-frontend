import React from "react";
import { Navbar, Sidebar } from "../components/common";
import { Content} from "antd/es/layout/layout";
import { Layout } from "antd";

const library: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Layout className="h-screen" hasSider>
        <Sidebar />
        <Content>"Hello"</Content>
      </Layout>
    </Layout>
  );
};

export default library;
