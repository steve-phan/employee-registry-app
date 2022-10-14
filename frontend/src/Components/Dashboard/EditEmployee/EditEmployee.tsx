import React from "react";

import { toggleEditEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { DashBoardModal } from "../DashBoardModal/DashBoardModal";

export const EditEmployee = ({ open }: { open: boolean }) => {
  const handleEditEmployee = () => {};
  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleEditEmployeeModal}
      title="Edit Employee"
      showModalFooter
      onOk={handleEditEmployee}
    >
      <>WIP</>
    </DashBoardModal>
  );
};
