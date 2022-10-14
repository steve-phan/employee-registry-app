import { Button, Row } from "antd";
import {
  LoginOutlined,
  EditOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import React from "react";

import { useAppDispatch } from "../../../store/hooks";
import { setSingOutActiveEmployee } from "../../../store/user/user.reducer";
import {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
} from "../../../store/dashboard/dashboard.reducer";
import AccountInfo from "./AccountInfo";

const SideBar = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        height: "100%",
        padding: "30px 8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AccountInfo />
      <Row gutter={[0, 12]}>
        <Button
          block
          type="primary"
          icon={<CloudUploadOutlined />}
          onClick={() => {
            dispatch(toggleUploadCSVFILEEMPLOYEEModal(true));
          }}
        >
          Upload Employee file?
        </Button>
        <Button
          block
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            dispatch(toggleAddEmployeeModal(true));
          }}
        >
          Add employee?
        </Button>
        <Button
          block
          danger
          icon={<LoginOutlined />}
          onClick={() => {
            dispatch(setSingOutActiveEmployee());
          }}
        >
          Sign out
        </Button>
      </Row>
    </div>
  );
};

export default SideBar;
