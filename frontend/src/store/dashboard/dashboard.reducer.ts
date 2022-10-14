import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    openModal: {
      ADD_EMPPLOYEE: false,
      UPLOAD_CSV_FILE_EMPLOYEE: false,
    },
  },
  reducers: {
    toggleAddEmployeeModal(state, action) {
      state.openModal.ADD_EMPPLOYEE = action.payload;
    },
    toggleUploadCSVFILEEMPLOYEEModal(state, action) {
      state.openModal.UPLOAD_CSV_FILE_EMPLOYEE = action.payload;
    },
  },
});

export const { toggleAddEmployeeModal, toggleUploadCSVFILEEMPLOYEEModal } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
