import { Empty, Spin, Table } from "antd";
import { ROLE } from "src/@types";

import { useGetAllEmployees } from "src/hooks";
import { useAppDispatch } from "src/store/hooks";

import {
  getActionColumn,
  getColumnsEmployee,
  modifyEmployee,
} from "./Employees.helpers";

export const Employees = () => {
  const dispatch = useAppDispatch();
  const { employees, isLoading, roles } = useGetAllEmployees();

  if (isLoading) {
    return <Spin />;
  }

  if (employees.length === 0) {
    return <Empty />;
  }

  const modifiedEmployee = modifyEmployee(employees);
  const withChefPermision = getActionColumn(dispatch);
  const columnsEmployee = getColumnsEmployee(dispatch);
  const columnsEmployeeWithPermission = roles.includes(ROLE.CHEF)
    ? [...columnsEmployee, withChefPermision]
    : columnsEmployee;

  return (
    <Table
      //@ts-ignore
      columns={columnsEmployeeWithPermission}
      dataSource={modifiedEmployee}
      pagination={{ defaultCurrent: 1, defaultPageSize: 10 }}
    />
  );
};
