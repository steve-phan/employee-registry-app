import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { useQuery } from "react-query";

import { DashBoardModal } from "../../shared/DashBoardModal/DashBoardModal";
import { toggleUploadCSVFILEEMPLOYEEModal } from "../../../store/dashboard/dashboard.reducer";
import { EmployeeAPI } from "../../../apis/API";
import { setAllEmployees } from "../../../store/user/user.reducer";
import { useAppDispatch } from "../../../store/hooks";

export const UploadCSVFileEmployee = ({ open }: { open: boolean }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isSubmituploading, setIsSubmitUploading] = useState(false);
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useQuery(
    ["uploadCSVEmployeeFile", isSubmituploading],
    () => {
      if (isSubmituploading) {
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append("files[]", file as RcFile);
        });
        return EmployeeAPI.uploadCSVEmployeeFile({ formData });
      }
    }
  );

  const handleUpload = () => {
    if (fileList.length === 0) {
      alert("please select a file to upload");
    } else {
      setIsSubmitUploading(true);
    }
  };

  const uploadDone = () => {
    setIsSubmitUploading(false);
    setFileList([]);
    dispatch(toggleUploadCSVFILEEMPLOYEEModal(false));
    console.log("toggle uploadcsv modal");
  };

  useEffect(() => {
    if (error) {
      message.error("upload failed.", 0.5).then(uploadDone);
    }
    if (data) {
      console.log(" hey message do your job man");
      message.success("upload successfully.", 0.5).then(uploadDone);
      dispatch(setAllEmployees(data?.users));
    }
  }, [data, isLoading, isSubmituploading]);

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
