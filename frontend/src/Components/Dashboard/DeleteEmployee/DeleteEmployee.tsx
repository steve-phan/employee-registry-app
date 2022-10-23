import { DashBoardModal } from "src/Components/shared/DashBoardModal/DashBoardModal";
import { useDeleteEmployee } from "src/hooks";
import { toggleDeleteEmployeeModal } from "src/store";

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
