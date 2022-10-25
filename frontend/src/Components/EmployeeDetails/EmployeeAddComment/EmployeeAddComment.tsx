import { Avatar, Comment } from "antd";
import { useMemo } from "react";

import { getRandomAvatarURL } from "src/Components/Employees/Employees.helpers";
import { Editor } from "src/Components/shared/Editor/Editor";
import { useEmployeeAddComment } from "src/hooks";
import { useAppSelector } from "src/store/hooks";

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
