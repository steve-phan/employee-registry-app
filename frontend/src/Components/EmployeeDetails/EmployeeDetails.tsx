import { Avatar, Comment, List, message, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useMemo, useState } from "react";

import { useQuery } from "react-query";
import { EmployeeAPI } from "../../apis/API";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRandomAvatarURL } from "../Employees/Employees.helpers";
import { Editor } from "../shared/Editor/Editor";
import EmployeeComments from "./EmployeeComments/EmployeeComments";
import { wrapCommentStyles } from "./EmployeeDetails.styles";
import { EmployeeDetailsBreadcrumb } from "./EmployeeDetailsBreadcrumb/EmployeeDetailsBreadcrumb";
import { EmployeeDetailsHeader } from "./EmployeeDetailsHeader/EmployeeDetailsHeader";

dayjs.extend(relativeTime);

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

export const EmployeeDetails = () => {
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

  useEffect(() => {
    if (submitting) {
      if (error) {
        message.error("comment failed");
      }
      if (data) {
        message.success("add comment successfully");
      }
      setSubmitting(false);
      setValue("");
    }
  }, [submitting]);

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
  return (
    <div>
      <EmployeeDetailsBreadcrumb />
      <EmployeeDetailsHeader />
      <div style={wrapCommentStyles}>
        {<EmployeeComments newcomment={submitting} />}
        <Comment
          avatar={<Avatar src={employeeAvatar} alt="Han Solo" />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    </div>
  );
};
