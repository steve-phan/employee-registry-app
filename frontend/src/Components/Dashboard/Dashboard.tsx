import { Layout, Typography } from "antd";
import { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import { Account } from "../Account/Account";
import Employees from "./Employees/Employees";
import SideBar from "./SideBar/SideBar";

const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
  const [collap, setCollop] = useState(false);
  const { isUserLogin } = useAppSelector(
    (state) => state.employee.activeEmployee
  );

  if (!isUserLogin) {
    return <Account />;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="light"
        breakpoint="md"
        collapsible
        defaultCollapsed
        collapsedWidth="30"
        onCollapse={(col) => {
          setCollop(col);
        }}
      >
        {!collap && <SideBar />}
      </Sider>
      <Layout>
        <Header
          style={{
            background: "white",
          }}
        >
          <Typography.Paragraph strong>
            Welcome to Amazing gbmh
          </Typography.Paragraph>
        </Header>
        <Content>
          <Employees />
        </Content>
        <Footer>©{new Date().getFullYear()} Amzing gmbh</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
