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
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === ROLE.MANAGER) {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
