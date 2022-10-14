import { message } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "../../../apis/API";
import { toggleDeleteEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAllEmployees } from "../../../store/user/user.reducer";
import { DashBoardModal } from "../DashBoardModal/DashBoardModal";

export const DeleteEmployee = ({ open }: { open: boolean }) => {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useAppDispatch();
  const { email, firstName, lastName, userName } = useAppSelector(
    (state) => state.dashboard.currentInActionEmployee
  );
  const { data, error } = useQuery(["deleteEmployee", isDelete], () => {
    if (isDelete) {
      return EmployeeAPI.deleteEmployee({ email });
    }
  });
  const handleDeleteEmployee = () => {
    setIsDelete(true);
  };

  useEffect(() => {
    if (data) {
      message.success(`delete ${userName} successfully.`).then(() => {
        setIsDelete(false);
        dispatch(setAllEmployees(data?.users));
        dispatch(toggleDeleteEmployeeModal(false));
      });
    }
    if (error) {
      message.error(`delete ${userName} failed.`);
    }
  }, [data, dispatch]);

  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleDeleteEmployeeModal}
      title="Are you sure want to delete this EMPLOYEE?"
      showModalFooter
      onOk={handleDeleteEmployee}
    >
      <>
        Employee: {firstName} {lastName}
      </>
    </DashBoardModal>
  );
};
