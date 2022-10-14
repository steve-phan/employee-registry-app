import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    openModal: {
      ADD_EMPPLOYEE: false,
      UPLOAD_CSV_FILE_EMPLOYEE: false,
      DELETE_EMPLOYEE: false,
      EDIT_EMPLOYEE: false,
    },
    currentInActionEmployee: undefined,
  },
  reducers: {
    toggleAddEmployeeModal(state, action) {
      state.openModal.ADD_EMPPLOYEE = action.payload;
    },
    toggleUploadCSVFILEEMPLOYEEModal(state, action) {
      state.openModal.UPLOAD_CSV_FILE_EMPLOYEE = action.payload;
    },
    toggleDeleteEmployeeModal(state, action) {
      state.openModal.DELETE_EMPLOYEE = action.payload;
    },
    toggleEditEmployeeModal(state, action) {
      state.openModal.EDIT_EMPLOYEE = action.payload;
    },
    setCurrentInActionEmployee(state, action) {
      state.currentInActionEmployee = action.payload;
    },
  },
});

export const {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
  toggleDeleteEmployeeModal,
  toggleEditEmployeeModal,
  setCurrentInActionEmployee,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
