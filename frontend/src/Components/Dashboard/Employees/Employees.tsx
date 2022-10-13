import { Empty, Spin, Table } from "antd";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "../../../apis/API";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAllEmployees } from "../../../store/user/user.reducer";
import { columnsEmployee } from "./Employees.helpers";

const Employees = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employee.allEmployees);
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
        name: `${employee.firstName} ${employee.lastName}`,
        key: `${index}_${employee.email}`,
      };
    });

  if (isLoading) {
    return <Spin />;
  }

  if (employees.length === 0) {
    return <Empty />;
  }

  return (
    <Table
      columns={columnsEmployee}
      dataSource={modifiedEmployee}
      pagination={{ defaultCurrent: 1, defaultPageSize: 10 }}
    />
  );
};

export default Employees;
