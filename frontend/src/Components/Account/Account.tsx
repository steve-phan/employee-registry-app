import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";

import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export const Account: React.FC = () => {
  const accountHeadings = [
    {
      title: "Login",
      icon: <UserAddOutlined />,
      children: <SignIn />,
    },

    {
      title: "Registration",
      icon: <UserOutlined />,
      children: <SignUp />,
    },
  ];
  return (
    <div
      style={{ margin: "200px auto 0 auto", maxWidth: "450px", padding: 16 }}
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
