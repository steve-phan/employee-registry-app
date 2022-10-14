import { Layout, Typography } from "antd";
import { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import { Account } from "../Account/Account";
import { AddEmployee } from "./AddEmployee/AddEmployee";
import Employees from "./Employees/Employees";
import SideBar from "./SideBar/SideBar";
import { UploadCSVFileEmployee } from "./UploadCSVFileEmployee/UploadCSVFileEmployee";
import { sliderStyles } from "./Dashboard.styles";
import { DeleteEmployee } from "./DeleteEmployee/DeleteEmployee";
import { EditEmployee } from "./EditEmployee/EditEmployee";

const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
  const [collap, setCollop] = useState(false);
  const {
    isUserLogin,
    openAddEmPloyeeModal,
    openUploadCSVFileEmployee,
    openDeleteEmployeeModal,
    openEditEmployeeModal,
  } = useAppSelector((state) => {
    return {
      isUserLogin: state.employee.activeEmployee.isUserLogin,
      openAddEmPloyeeModal: state.dashboard.openModal.ADD_EMPPLOYEE,
      openUploadCSVFileEmployee:
        state.dashboard.openModal.UPLOAD_CSV_FILE_EMPLOYEE,
      openDeleteEmployeeModal: state.dashboard.openModal.DELETE_EMPLOYEE,
      openEditEmployeeModal: state.dashboard.openModal.EDIT_EMPLOYEE,
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
      {openDeleteEmployeeModal && (
        <DeleteEmployee open={openDeleteEmployeeModal} />
      )}
      {openAddEmPloyeeModal && <AddEmployee open={openAddEmPloyeeModal} />}
      {openUploadCSVFileEmployee && (
        <UploadCSVFileEmployee open={openUploadCSVFileEmployee} />
      )}
      {openEditEmployeeModal && <EditEmployee open={openEditEmployeeModal} />}
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
        <Content>
          <Employees />
        </Content>
        <Footer>©{new Date().getFullYear()} Amzing gmbh</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
