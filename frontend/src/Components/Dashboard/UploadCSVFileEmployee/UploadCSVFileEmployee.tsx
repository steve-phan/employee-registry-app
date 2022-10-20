import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import { DashBoardModal } from "src/Components/shared/DashBoardModal/DashBoardModal";
import { useUploadCSVFileEmployee } from "src/hooks";
import { toggleUploadCSVFILEEMPLOYEEModal } from "src/store";

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
