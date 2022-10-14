import { Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

export const ROLE = {
  VERKÄUFER: "VERKÄUFER",
  EINKÄUFER: "EINKÄUFER",
  CHEF: "CHEF",
} as const;

export type TROLE = keyof typeof ROLE;

export interface IEmployee {
  name: string;
  email: string;
  address: string;
  role: TROLE[];
  action?: string;
}

export const EmployeeColor = {
  [ROLE.EINKÄUFER]: "geekblue",
  [ROLE.VERKÄUFER]: "green",
  [ROLE.CHEF]: "volcano",
} as const;

export const withChefPermision = {
  title: "Action",
  dataIndex: "action",
  key: "action",
  ellipsis: true,
  render: (_: any, record: { email: string }) => (
    <Space size="middle">
      <span
        className="action_button"
        onClick={() => {
          console.log({ userName: record.email });
        }}
      >
        Edit
      </span>
      <span className="action_button">Delete</span>
    </Space>
  ),
};

export const columnsEmployee: ColumnsType<IEmployee> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: true,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
  },
  {
    title: "Role",
    key: "role",
    ellipsis: true,
    dataIndex: "role",
    render: (_, { role }) => (
      <>
        {role.map((tag) => {
          return (
            <Tag color={EmployeeColor[tag]} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
