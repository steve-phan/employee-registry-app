import { Spin, Table } from "antd";
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

  const modifiedEmployee = employees.map((employee, index) => {
    return {
      ...employee,
      name: `${employee.firstName} ${employee.lastName}`,
      key: `${index}_${employee.email}`,
    };
  });

  if (isLoading) {
    return <Spin />;
  }
  return <Table columns={columnsEmployee} dataSource={modifiedEmployee} />;
};

export default Employees;
