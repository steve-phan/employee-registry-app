import { Avatar, Comment } from "antd";
import { useEffect, useMemo, useState } from "react";

import { getRandomAvatarURL } from "../../Employees/Employees.helpers";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Editor } from "../../shared/Editor/Editor";
import { EmployeeAPI } from "../../../apis/API";
import { useQuery } from "react-query";
import { setEmployeeComments } from "../../../store/dashboard/dashboard.reducer";

export const EmployeeAddComment = () => {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const { activeEmployee, employeeInfo } = useAppSelector((state) => ({
    activeEmployee: state.employee.activeEmployee,
    employeeInfo: state.dashboard.employeeDetails.employeeInfo,
  }));
  const { data, isLoading, error } = useQuery(
    ["comment/add-comment", submitting, value],
    () => {
      if (submitting && value) {
        return EmployeeAPI.addComment({
          employeeId: employeeInfo?._id,
          comment: {
            author: `${activeEmployee.firstName} ${activeEmployee.lastName}`,
            authorId: activeEmployee?._id,
            content: value,
          },
        });
      }
    }
  );
  const employeeAvatar = useMemo(
    () => getRandomAvatarURL(activeEmployee?._id),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
  };

  useEffect(() => {
    if (submitting && data) {
      dispatch(setEmployeeComments(data.allComents.comments));
      setSubmitting(false);
      setValue("");
    }
  }, [submitting, isLoading]);

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
