import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import { toggleEmployeeDetails } from "src/store";
import { useAppDispatch } from "src/store/hooks";

export const EmployeeDetailsBreadcrumb = () => {
  const dispatch = useAppDispatch();
  return (
    <Breadcrumb className="dashboard-employee">
      <Breadcrumb.Item
        className="dashboard-employee__item"
        onClick={() => {
          dispatch(toggleEmployeeDetails(false));
        }}
      >
        <UserOutlined />
        <span>Employees List</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Employee Details</Breadcrumb.Item>
    </Breadcrumb>
  );
};
