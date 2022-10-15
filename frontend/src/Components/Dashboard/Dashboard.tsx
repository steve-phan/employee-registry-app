import { Layout, Typography } from "antd";
import { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import { Account } from "../Account/Account";
import { sliderStyles } from "./Dashboard.styles";
import { DashBoardModalGroup } from "./DashBoardModalGroup/DashBoardModalGroup";
import { EmployeePage } from "./EmployeePage/EmployeePage";
import { Employees } from "./Employees/Employees";
import { SideBar } from "./SideBar/SideBar";

const { Header, Footer, Sider, Content } = Layout;

export const Dashboard = () => {
  const [collap, setCollop] = useState(false);
  const { isUserLogin, openEmployeePage } = useAppSelector((state) => {
    return {
      isUserLogin: state.employee.activeEmployee.isUserLogin,
      openEmployeePage: state.dashboard.employeePage.open,
    };
  });

  if (!isUserLogin) {
    return <Account />;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <DashBoardModalGroup />
      <Sider
        breakpoint="sm"
        collapsible
        collapsedWidth="30"
        onCollapse={(col) => {
          setCollop(col);
        }}
        style={{
          ...sliderStyles,
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
        <Content>{openEmployeePage ? <EmployeePage /> : <Employees />}</Content>
        <Footer>©{new Date().getFullYear()} Amzing gmbh</Footer>
      </Layout>
    </Layout>
  );
};
