import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: { employees: [] },
  reducers: {
    setAllEmployees(state, action) {
      state.employees = action.payload;
    },
  },
});

export const { setAllEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
