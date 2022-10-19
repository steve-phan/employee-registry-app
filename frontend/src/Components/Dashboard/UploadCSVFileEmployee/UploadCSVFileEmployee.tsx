import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import { useUploadCSVFileEmployee } from "../../../hooks";
import { toggleUploadCSVFILEEMPLOYEEModal } from "../../../store/dashboard/dashboard.reducer";
import { DashBoardModal } from "../../shared/DashBoardModal/DashBoardModal";

export const UploadCSVFileEmployee = ({ open }: { open: boolean }) => {
  const { handleUpload, upLoadprops } = useUploadCSVFileEmployee();

  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleUploadCSVFILEEMPLOYEEModal}
      title="Upload CSV file Employees"
      showModalFooter
      onOk={handleUpload}
    >
      <Upload {...upLoadprops}>
        <Button icon={<UploadOutlined />}>Click to select</Button>
      </Upload>
    </DashBoardModal>
  );
};
