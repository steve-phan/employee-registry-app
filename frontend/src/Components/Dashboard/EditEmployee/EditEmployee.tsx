import React from "react";

import { toggleEditEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { DashBoardModal } from "../../shared/DashBoardModal/DashBoardModal";
import { EditEableForm } from "./EditEableForm";

export const EditEmployee = ({ open }: { open: boolean }) => {
  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleEditEmployeeModal}
      title="Edit Employee"
    >
      <EditEableForm />
    </DashBoardModal>
  );
};
