import { message, UploadFile } from "antd";
import { RcFile, UploadProps } from "antd/lib/upload";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "src/apis/API";
import { setAllEmployees, toggleUploadCSVFILEEMPLOYEEModal } from "src/store";
import { useAppDispatch } from "src/store/hooks";

export const useUploadCSVFileEmployee = () => {
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
  };

  useEffect(() => {
    if (error) {
      message.error("upload failed.", 0.5).then(uploadDone);
    }
    if (data) {
      message.success("upload successfully.", 0.5).then(uploadDone);
      dispatch(setAllEmployees(data?.users));
    }
  }, [data, isLoading, isSubmituploading]);

  const upLoadprops: UploadProps = {
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

  return {
    upLoadprops,
    handleUpload,
  };
};
