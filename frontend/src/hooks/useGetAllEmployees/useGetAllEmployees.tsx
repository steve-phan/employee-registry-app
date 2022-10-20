import { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "src/apis/API";
import { setAllEmployees } from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const useGetAllEmployees = () => {
  const dispatch = useAppDispatch();
  const { employees, roles } = useAppSelector((state) => {
    return {
      employees: state.employee.allEmployees,
      roles: state.employee.activeEmployee.role,
    };
  });
  const { data, isLoading } = useQuery(["getAllEmployees", employees], () =>
    EmployeeAPI.getAllEmployees()
  );

  useEffect(() => {
    if (data) {
      dispatch(setAllEmployees(data?.users));
    }
  }, [data, dispatch]);

  return {
    employees,
    roles,
    isLoading,
  };
};
