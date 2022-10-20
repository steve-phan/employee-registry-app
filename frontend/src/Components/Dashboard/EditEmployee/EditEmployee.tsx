import { DashBoardModal } from "src/Components/shared/DashBoardModal/DashBoardModal";
import { toggleEditEmployeeModal } from "src/store";

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
