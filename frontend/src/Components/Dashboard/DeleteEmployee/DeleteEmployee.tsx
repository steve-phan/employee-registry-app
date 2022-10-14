import React from "react";

import { toggleDeleteEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { DashBoardModal } from "../DashBoardModal/DashBoardModal";

export const DeleteEmployee = ({ open }: { open: boolean }) => {
  const handleDeleteEmployee = () => {
    console.log("{}");
  };
  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleDeleteEmployeeModal}
      title="Are you sure want to delete this EMPLOYEE?"
      showModalFooter
      onOk={handleDeleteEmployee}
    >
      <></>
    </DashBoardModal>
  );
};
