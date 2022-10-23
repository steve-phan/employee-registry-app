import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Modal } from "antd";

import { useAppDispatch } from "src/store/hooks";

export interface IDashBoardModalProps {
  title: string;
  open: boolean;
  toggleModal: ActionCreatorWithPayload<any, string>;
  children: JSX.Element;
  showModalFooter?: boolean;
  onOk?: () => void;
}

export const DashBoardModal = ({
  open,
  title,
  toggleModal,
  children,
  showModalFooter = false,
  onOk = () => {},
}: IDashBoardModalProps) => {
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(toggleModal(false));
  };
  const handleOk = () => {
    onOk();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      //   footer={!showModalFooter ? null : true}
      {...(!showModalFooter && { footer: null })}
      okText="Submit"
      onOk={handleOk}
      wrapClassName={showModalFooter ? "" : "dashboard-modal"}
    >
      {children}
    </Modal>
  );
};
