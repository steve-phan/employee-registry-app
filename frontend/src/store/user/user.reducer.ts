import { createSlice } from "@reduxjs/toolkit";

const currentEmployeeDefault = {
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
  initialState: { allEmployees: [], currentEmployee: currentEmployeeDefault },
  reducers: {
    setAllEmployees(state, action) {
      state.allEmployees = action.payload;
    },
  },
});

export const { setAllEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
