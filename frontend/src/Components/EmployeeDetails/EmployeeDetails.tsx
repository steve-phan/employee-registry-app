import { Avatar, Comment, List, message, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useMemo, useState } from "react";

import { useQuery } from "react-query";
import { EmployeeAPI } from "../../apis/API";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRandomAvatarURL } from "../Employees/Employees.helpers";
import { Editor } from "../shared/Editor/Editor";
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

const commentsData = [
  {
    // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: getRandomAvatarURL("344dsg454"),
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
      </p>
    ),
    datetime: (
      <Tooltip title="2016-11-22 11:22:33">
        <span>8 hours ago</span>
      </Tooltip>
    ),
  },
  {
    // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design
      </p>
    ),
    datetime: (
      <Tooltip>
        <span>9 hours ago</span>
      </Tooltip>
    ),
  },
];

export const EmployeeDetails = () => {
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<CommentItem[]>([]);
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
            author: `${employeeInfo.firstName} ${employeeInfo.lastName}`,
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
        console.log({ data });
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
  console.log({ employeeAvatar });
  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    // setTimeout(() => {
    //   setSubmitting(false);
    //   setValue("");
    //   setComments([
    //     ...comments,
    //     {
    //       author: "Han Solo",
    //       avatar: employeeAvatar,
    //       content: <p>{value}</p>,
    //       datetime: dayjs("2016-11-22").fromNow(),
    //     },
    //   ]);
    // }, 1000);
  };
  return (
    <div>
      <EmployeeDetailsBreadcrumb />
      <EmployeeDetailsHeader />
      <div style={wrapCommentStyles}>
        <List
          className="comment-list"
          header={`${commentsData.length} comments`}
          itemLayout="horizontal"
          dataSource={commentsData}
          renderItem={(item) => (
            <li>
              <Comment
                // actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
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
