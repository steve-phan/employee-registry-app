import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI, ISignInInfo } from "../../../apis/API";
import { useAppDispatch } from "../../../store/hooks";
import { setActiveEmployee } from "../../../store/user/user.reducer";
import { noWhiteSpace } from "../EmployeeSignUp/EmployeeSignUp.helpers";

export const EmployeeSignIn: React.FC = () => {
  const [signInInfo, setSignInInfo] = useState<ISignInInfo>();
  const [isSubmitSignIn, setIsSubmitSignIn] = useState(false);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery(
    ["signInEmployee", signInInfo, isSubmitSignIn],
    () => {
      if (isSubmitSignIn && signInInfo) {
        return EmployeeAPI.signIn({ signInInfo });
      }
    }
  );
  const onFinish = (values: any) => {
    setIsSubmitSignIn(true);
    setSignInInfo(values);
  };

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setActiveEmployee({ ...data.user }));
    }
    if (error) {
      message.error("SignIn failed").then(() => setIsSubmitSignIn(false));
    }
  }, [data, isLoading, dispatch, signInInfo]);
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="userName"
        rules={[
          { required: true, message: "Please input your Username!" },
          {
            ...noWhiteSpace,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
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
