import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    openModal: {
      ADD_EMPPLOYEE: false,
    },
  },
  reducers: {
    toggleAddEmployeeModal(state, action) {
      state.openModal.ADD_EMPPLOYEE = action.payload;
    },
  },
});

export const { toggleAddEmployeeModal } = dashboardSlice.actions;

export default dashboardSlice.reducer;
