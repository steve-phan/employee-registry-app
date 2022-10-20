import { EmployeeSignUp } from "src/Components/Account/EmployeeSignUp/EmployeeSignUp";
import { SignUpType } from "src/Components/Account/EmployeeSignUp/EmployeeSignUp.helpers";
import { DashBoardModal } from "src/Components/shared/DashBoardModal/DashBoardModal";
import { toggleAddEmployeeModal } from "src/store";

export const AddEmployee = ({ open }: { open: boolean }) => {
  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleAddEmployeeModal}
      title="Add a new employee"
    >
      <EmployeeSignUp type={SignUpType.ADD_EMPLOYEE} />
    </DashBoardModal>
  );
};
