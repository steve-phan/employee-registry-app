import { useAppSelector } from "../../../store/hooks";
import { Account } from "../../Account/Account";
import { AddEmployee } from "../AddEmployee/AddEmployee";
import { DeleteEmployee } from "../DeleteEmployee/DeleteEmployee";
import { EditEmployee } from "../EditEmployee/EditEmployee";
import { UploadCSVFileEmployee } from "../UploadCSVFileEmployee/UploadCSVFileEmployee";

export const DashBoardModalGroup = () => {
  const {
    isUserLogin,
    openAddEmPloyeeModal,
    openUploadCSVFileEmployee,
    openDeleteEmployeeModal,
    openEditEmployeeModal,
  } = useAppSelector((state) => {
    return {
      isUserLogin: state.employee.activeEmployee.isUserLogin,
      openAddEmPloyeeModal: state.dashboard.openModal.ADD_EMPPLOYEE,
      openUploadCSVFileEmployee:
        state.dashboard.openModal.UPLOAD_CSV_FILE_EMPLOYEE,
      openDeleteEmployeeModal: state.dashboard.openModal.DELETE_EMPLOYEE,
      openEditEmployeeModal: state.dashboard.openModal.EDIT_EMPLOYEE,
    };
  });

  // We might need this condition to reuse in another component
  if (!isUserLogin) {
    return <Account />;
  }
  return (
    <>
      {openDeleteEmployeeModal && (
        <DeleteEmployee open={openDeleteEmployeeModal} />
      )}
      {openAddEmPloyeeModal && <AddEmployee open={openAddEmPloyeeModal} />}
      {openUploadCSVFileEmployee && (
        <UploadCSVFileEmployee open={openUploadCSVFileEmployee} />
      )}
      {openEditEmployeeModal && <EditEmployee open={openEditEmployeeModal} />}
    </>
  );
};
