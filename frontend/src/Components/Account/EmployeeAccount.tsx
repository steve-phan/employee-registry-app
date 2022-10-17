import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";

import { EmployeeSignUp } from "./EmployeeSignUp/EmployeeSignUp";
import { EmployeeSignIn } from "./EmployeeSignIn/EmployeeSignIn";

export const EmployeeAccount: React.FC = () => {
  const accountHeadings = [
    {
      title: "Login",
      icon: <UserAddOutlined />,
      children: <EmployeeSignIn />,
    },

    {
      title: "Registration",
      icon: <UserOutlined />,
      children: <EmployeeSignUp />,
    },
  ];
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "450px",
        padding: "150px 16px 16px ",
      }}
    >
      <Tabs
        defaultActiveKey="1"
        centered
        tabBarGutter={48}
        size="large"
        tabBarStyle={{ border: "1px solid #cecece", marginBottom: 36 }}
        items={accountHeadings.map((heading, i) => {
          const id = String(i + 1);

          return {
            label: (
              <span style={{ fontSize: 18, fontWeight: 500 }}>
                {heading.icon}
                {heading.title}
              </span>
            ),
            key: id,
            children: heading.children,
          };
        })}
      />
    </div>
  );
};
