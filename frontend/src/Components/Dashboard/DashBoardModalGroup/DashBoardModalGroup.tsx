import { EmployeeAccount } from "src/Components/Account/EmployeeAccount";
import { useAppSelector } from "src/store/hooks";

import { AddEmployee } from "../AddEmployee/AddEmployee";
import { DeleteEmployee } from "../DeleteEmployee/DeleteEmployee";
import { EditEmployee } from "../EditEmployee/EditEmployee";
import { UploadCSVFileEmployee } from "../UploadCSVFileEmployee/UploadCSVFileEmployee";

export const DashBoardModalGroup = () => {
  const {
    isEmployeeLogin,
    openAddEmPloyeeModal,
    openUploadCSVFileEmployee,
    openDeleteEmployeeModal,
    openEditEmployeeModal,
  } = useAppSelector((state) => {
    return {
      isEmployeeLogin: state.employee.activeEmployee.isEmployeeLogin,
      openAddEmPloyeeModal: state.dashboard.openModal.ADD_EMPPLOYEE,
      openUploadCSVFileEmployee:
        state.dashboard.openModal.UPLOAD_CSV_FILE_EMPLOYEE,
      openDeleteEmployeeModal: state.dashboard.openModal.DELETE_EMPLOYEE,
      openEditEmployeeModal: state.dashboard.openModal.EDIT_EMPLOYEE,
    };
  });

  // We might need this condition to reuse in another component
  if (!isEmployeeLogin) {
    return <EmployeeAccount />;
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
