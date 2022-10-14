import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import axios from "axios";

import { DashBoardModal } from "../DashBoardModal/DashBoardModal";
import { toggleUploadCSVFILEEMPLOYEEModal } from "../../../store/dashboard/dashboard.reducer";

export const UploadCSVFileEmployee = ({ open }: { open: boolean }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    setUploading(true);
    axios
      .post("http://localhost:2022/upload/employeefile", formData)
      .then((res) => {})
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <DashBoardModal
      open={open}
      toggleModal={toggleUploadCSVFILEEMPLOYEEModal}
      title="Upload CSV file Employees"
      showModalFooter
      onOk={handleUpload}
    >
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to select</Button>
      </Upload>
    </DashBoardModal>
  );
};
