import { Button, Form, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI, IUserInfo, ROLE } from "../../apis/API";
import { useAppDispatch } from "../../store/hooks";
import { setActiveEmployee } from "../../store/user/user.reducer";

export const SignUp: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery(
    ["signUpEmployee", userInfo],
    () => {
      if (userInfo) {
        return EmployeeAPI.signUp({ userInfo });
      }
    }
  );
  const [form] = Form.useForm();

  const onFinish = (values: IUserInfo) => {
    setUserInfo(values);
  };

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setActiveEmployee({ ...userInfo, role: [ROLE.EMPLOYEE] }));
    }
  }, [data, isLoading, dispatch, userInfo]);

  return (
    <Form
      layout="vertical"
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="userName"
        label="UserName"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please input your first Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please input your last Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please input your Address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          {!isLoading ? "Register" : "Loading"}
        </Button>
      </Form.Item>
      <Form.Item>
        {/* // eslint-disable-next-line react/jsx-no-undef */}
        {/* @ts-ignore */}
        {error && (
          <Typography.Text type="danger">
            {/* @ts-ignore */}
            {error?.response?.data?.error}
          </Typography.Text>
        )}
      </Form.Item>
    </Form>
  );
};
