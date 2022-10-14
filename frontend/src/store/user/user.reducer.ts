import { createSlice } from "@reduxjs/toolkit";

import { IUserInfo } from "../../apis/API";
import { ROLE } from "../../Components/Dashboard/Employees/Employees.helpers";

const activeEmployeeDefault: Omit<IActiveEmployee, "password"> = {
  isUserLogin: false,
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  role: [ROLE.VERKÄUFER],
};

export interface IActiveEmployee extends IUserInfo {
  isUserLogin: boolean;
}

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
