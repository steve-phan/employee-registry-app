import { Button, Row } from "antd";
import { EditOutlined, CloudUploadOutlined } from "@ant-design/icons";
import React from "react";

import { useAppDispatch } from "../../../store/hooks";
import {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
} from "../../../store/dashboard/dashboard.reducer";

const ChefButtonsGroup = () => {
  const dispatch = useAppDispatch();

  return (
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
    </Row>
  );
};

export default ChefButtonsGroup;
