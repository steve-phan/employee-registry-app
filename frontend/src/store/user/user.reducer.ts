import { createSlice } from "@reduxjs/toolkit";

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
  initialState: { allEmployees: [], activeEmployee: activeEmployeeDefault },
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
  },
});

export const { setAllEmployees, setActiveEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
