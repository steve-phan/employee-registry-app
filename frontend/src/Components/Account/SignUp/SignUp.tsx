import { Button, Form, Input, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { InfoCircleOutlined } from "@ant-design/icons";

import { EmployeeAPI, IUserInfo } from "../../../apis/API";
import { useAppDispatch } from "../../../store/hooks";
import {
  setActiveEmployee,
  setAllEmployees,
} from "../../../store/user/user.reducer";
import {
  noWhiteSpace,
  SignUpBtnText,
  SignUpType,
  TSignUpBtn,
} from "./SignUp.helpers";
import { toggleAddEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { ROLE } from "../../Employees/Employees.helpers";

export const SignUp = ({
  type = SignUpType.SELF_REGISTRATION,
}: {
  type?: TSignUpBtn;
}) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const dispatch = useAppDispatch();
  const [isSubmitSignUp, setIsSubmitSignUp] = useState(false);
  const { data, error, isLoading } = useQuery(
    ["signUpEmployee", isSubmitSignUp],
    () => {
      if (isSubmitSignUp && userInfo) {
        const password =
          type === SignUpType.ADD_EMPLOYEE ? "123456" : userInfo.password;
        return EmployeeAPI.signUp({ userInfo: { ...userInfo, password } });
      }
    }
  );
  const [form] = Form.useForm();

  const onFinish = (values: IUserInfo) => {
    setIsSubmitSignUp(true);
    setUserInfo(values);
  };

  useEffect(() => {
    if (!isLoading && data) {
      if (type === SignUpType.SELF_REGISTRATION) {
        dispatch(setActiveEmployee({ ...userInfo, role: [ROLE.VERKÄUFER] }));
      } else {
        dispatch(setAllEmployees(data?.users));
      }

      message
        .success("register successfully")
        .then(() => dispatch(toggleAddEmployeeModal(false)));
    }
    if (error) {
      message.error("register failed");
      setIsSubmitSignUp(false);
    }
  }, [data, isLoading]);

  return (
    <Form
      layout="vertical"
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="userName"
        label="UserName"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
          {
            ...noWhiteSpace,
          },
        ]}
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
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please input your Address!" }]}
      >
        <Input />
      </Form.Item>
      {type === SignUpType.SELF_REGISTRATION ? (
        <>
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </>
      ) : (
        <Form.Item>
          <Typography.Text type="danger">
            <InfoCircleOutlined /> The default Password is: 123456
          </Typography.Text>
        </Form.Item>
      )}

      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          {!isLoading ? SignUpBtnText[type] : "Loading"}
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
