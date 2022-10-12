import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "../../apis/API";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAllEmployees } from "../../store/user/user.reducer";
import { Account } from "../Account/Account";

const fakeUser = {
  userName: "Royal",
  email: "hello@gmail.com",
  password: "12345",
  firstName: "Roy",
  lastName: "Old",
  address: "Berliner Str 3 10001",
  role: ["EMPLOYEE"],
};

const getAllEmployees = async () => {
  return await EmployeeAPI.getAllEmployees({ userInfo: fakeUser });
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isUserLogin } = useAppSelector(
    (state) => state.allEmployees.currentEmployee
  );
  const { data, isLoading } = useQuery("getAllEmployees", getAllEmployees);

  useEffect(() => {
    if (data) {
      dispatch(setAllEmployees(data?.users));
    }
  }, [data, dispatch]);
  if (!isUserLogin) {
    return <Account />;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
