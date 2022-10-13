import { Button, Modal } from "antd";
import React, { useState } from "react";

import { toggleAddEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { useAppDispatch } from "../../../store/hooks";
import { SignUp } from "../../Account/SignUp/SignUp";
import { SignUpType } from "../../Account/SignUp/SignUp.helpers";

export const AddEmployee = ({ open }: { open: boolean }) => {
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(toggleAddEmployeeModal(false));
  };

  return (
    <>
      <Modal
        title="Add a new employee"
        open={open}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="add-employee__modal"
      >
        <SignUp type={SignUpType.ADD_EMPLOYEE} />
      </Modal>
    </>
  );
};
