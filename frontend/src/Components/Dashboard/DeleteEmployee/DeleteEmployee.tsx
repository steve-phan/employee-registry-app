import { useDeleteEmployee } from "../../../hooks";
import { toggleDeleteEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { DashBoardModal } from "../../shared/DashBoardModal/DashBoardModal";

export const DeleteEmployee = ({ open }: { open: boolean }) => {
  const { handleDeleteEmployee, employeeFullname } = useDeleteEmployee();

  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleDeleteEmployeeModal}
      title="Are you sure want to delete this EMPLOYEE?"
      showModalFooter
      onOk={handleDeleteEmployee}
    >
      <>Employee: {employeeFullname}</>
    </DashBoardModal>
  );
};
