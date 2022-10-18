import { createSlice } from "@reduxjs/toolkit";

import { IEmployeeInfo } from "../../apis/API";
import { ROLE } from "../../Components/Employees/Employees.helpers";

const activeEmployeeDefault: Omit<IActiveEmployee, "password"> = {
  isEmployeeLogin: false,
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  role: [ROLE.VERKÄUFER],
  _id: "",
};

export interface IActiveEmployee extends IEmployeeInfo {
  isEmployeeLogin: boolean;
}

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    allEmployees: [] as IEmployeeInfo[],
    activeEmployee: activeEmployeeDefault,
  },
  reducers: {
    setAllEmployees(state, action) {
      state.allEmployees = action.payload;
    },

    setActiveEmployee(state, action) {
      state.activeEmployee = {
        ...action.payload,
        isEmployeeLogin: true,
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
