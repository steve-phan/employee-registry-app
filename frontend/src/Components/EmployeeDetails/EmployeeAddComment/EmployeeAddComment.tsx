import { Avatar, Comment } from "antd";
import { useMemo } from "react";

import { useEmployeeAddComment } from "../../../hooks";
import { useAppSelector } from "../../../store/hooks";
import { getRandomAvatarURL } from "../../Employees/Employees.helpers";
import { Editor } from "../../shared/Editor/Editor";

export const EmployeeAddComment = () => {
  const { activeEmployee } = useAppSelector((state) => ({
    activeEmployee: state.employee.activeEmployee,
    employeeInfo: state.dashboard.employeeDetails.employeeInfo,
  }));
  const employeeAvatar = useMemo(
    () => getRandomAvatarURL(activeEmployee?._id),
    []
  );
  const { handleSubmit, submitting, value, setValue } = useEmployeeAddComment();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Comment
      avatar={<Avatar src={employeeAvatar} alt="Amzing - Gbmh" />}
      content={
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
        />
      }
    />
  );
};
