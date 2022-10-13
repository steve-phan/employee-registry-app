import { createSlice } from "@reduxjs/toolkit";

import { IUserInfo } from "../../apis/API";

const activeEmployeeDefault = {
  isUserLogin: false,
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  role: ["EMPLOYEE"],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    allEmployees: [] as IUserInfo[],
    activeEmployee: activeEmployeeDefault,
  },
  reducers: {
    setAllEmployees(state, action) {
      state.allEmployees = action.payload;
    },

    setActiveEmployee(state, action) {
      state.activeEmployee = {
        ...action.payload,
        isUserLogin: true,
      };
    },

    setSingOutActiveEmployee(state) {
      state.activeEmployee = activeEmployeeDefault;
    },
  },
});

export const { setAllEmployees, setActiveEmployee, setSingOutActiveEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
