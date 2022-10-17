import { UserOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  List,
  Comment,
  Tooltip,
  Avatar,
  Form,
  Button,
  Input,
  message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { toggleEmployeeDetails } from "../../store/dashboard/dashboard.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRandomAvatarURL } from "../Employees/Employees.helpers";
import { wrapCommentStyles } from "./EmployeeDetails.styles";
import { EmployeeDetailsHeader } from "./EmployeeDetailsHeader/EmployeeDetailsHeader";
import { useQuery } from "react-query";
import { EmployeeAPI } from "../../apis/API";

dayjs.extend(relativeTime);

const { TextArea } = Input;

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}
const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    // avatar: getRandomAvatarURL(),
    content: (
      <p
        style={{
          textAlign: "left",
        }}
      >
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
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design
      </p>
    ),
    datetime: (
      <Tooltip title="2016-11-22 10:22:33">
        <span>9 hours ago</span>
      </Tooltip>
    ),
  },
];

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

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
      <Breadcrumb className="dashboard-employee">
        <Breadcrumb.Item
          className="dashboard-employee__item"
          onClick={() => {
            dispatch(toggleEmployeeDetails(false));
          }}
        >
          <UserOutlined />
          <span>Employees List</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Employee Details</Breadcrumb.Item>
      </Breadcrumb>
      <EmployeeDetailsHeader />
      <div style={wrapCommentStyles}>
        {/* <List
          className="comment-list"
          header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        /> */}
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
