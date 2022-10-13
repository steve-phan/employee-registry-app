import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

import { ROLE, TROLE } from "../../../apis/API";

export interface IEmployee {
  name: string;
  email: string;
  address: string;
  role: TROLE[];
}

export const EmployeeColor = {
  EMPLOYEE: "geekblue",
  MANAGER: "volcano",
} as const;

export const columnsEmployee: ColumnsType<IEmployee> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Role",
    key: "role",
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
