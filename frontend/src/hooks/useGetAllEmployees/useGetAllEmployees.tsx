import { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "../../apis/API";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAllEmployees } from "../../store/user/user.reducer";

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
