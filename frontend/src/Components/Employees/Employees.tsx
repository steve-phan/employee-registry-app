import { Empty, Spin, Table } from "antd";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "../../apis/API";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAllEmployees } from "../../store/user/user.reducer";
import { getColumnsEmployee, getActionColumn, ROLE } from "./Employees.helpers";

export const Employees = () => {
  const dispatch = useAppDispatch();
  const { employees, roles } = useAppSelector((state) => {
    return {
      employees: state.employee.allEmployees,
      roles: state.employee.activeEmployee.role,
    };
  });
  const { data, isLoading } = useQuery("getAllEmployees", () =>
    EmployeeAPI.getAllEmployees()
  );

  useEffect(() => {
    if (data) {
      dispatch(setAllEmployees(data?.users));
    }
  }, [data, dispatch]);
  const modifiedEmployee = [...employees]
    .sort((a, b) => a.firstName.charCodeAt(0) - b.firstName.charCodeAt(0))
    .map((employee, index) => {
      return {
        ...employee,
        name: employee,
        key: `${index}_${employee.email}`,
      };
    });

  const withChefPermision = getActionColumn(dispatch);

  if (isLoading) {
    return <Spin />;
  }

  if (employees.length === 0) {
    return <Empty />;
  }
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
