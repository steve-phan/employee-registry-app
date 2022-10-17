import React from "react";

import { toggleAddEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { EmployeeSignUp } from "../../Account/EmployeeSignUp/EmployeeSignUp";
import { SignUpType } from "../../Account/EmployeeSignUp/EmployeeSignUp.helpers";
import { DashBoardModal } from "../../shared/DashBoardModal/DashBoardModal";

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
