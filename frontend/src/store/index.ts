import store from "./store";
export type { AppDispatch, AppThunk, RootState } from "./store";
export {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
  toggleDeleteEmployeeModal,
  toggleEditEmployeeModal,
  toggleEmployeeDetails,
  setCurrentInActionEmployee,
  setEmployeeInfoPage,
  setEmployeeComments,
} from "./dashboard/dashboard.reducer";
export {
  setAllEmployees,
  setActiveEmployee,
  setSingOutActiveEmployee,
} from "./user/user.reducer";

export default store;
