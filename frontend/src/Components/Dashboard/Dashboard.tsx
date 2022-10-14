import { Layout, Typography } from "antd";
import { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import { Account } from "../Account/Account";
import { AddEmployee } from "./AddEmployee/AddEmployee";
import Employees from "./Employees/Employees";
import SideBar from "./SideBar/SideBar";
import { UploadCSVFileEmployee } from "./UploadCSVFileEmployee/UploadCSVFileEmployee";

const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
  const [collap, setCollop] = useState(false);
  const { isUserLogin, openAddEmPloyeeModal, openUploadCSVFileEmployee } =
    useAppSelector((state) => {
      return {
        isUserLogin: state.employee.activeEmployee.isUserLogin,
        openAddEmPloyeeModal: state.dashboard.openModal.ADD_EMPPLOYEE,
        openUploadCSVFileEmployee:
          state.dashboard.openModal.UPLOAD_CSV_FILE_EMPLOYEE,
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
      {openAddEmPloyeeModal && <AddEmployee open={openAddEmPloyeeModal} />}
      {openUploadCSVFileEmployee && (
        <UploadCSVFileEmployee open={openUploadCSVFileEmployee} />
      )}
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
