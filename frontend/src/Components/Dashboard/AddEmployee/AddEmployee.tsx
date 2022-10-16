import React from "react";

import { toggleAddEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { SignUp } from "../../Account/SignUp/SignUp";
import { SignUpType } from "../../Account/SignUp/SignUp.helpers";
import { DashBoardModal } from "../../shared/DashBoardModal/DashBoardModal";

export const AddEmployee = ({ open }: { open: boolean }) => {
  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleAddEmployeeModal}
      title="Add a new employee"
    >
      <SignUp type={SignUpType.ADD_EMPLOYEE} />
    </DashBoardModal>
  );
};
