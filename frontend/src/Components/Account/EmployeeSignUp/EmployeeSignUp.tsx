import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";

import { IEmployeeInfo } from "../../../apis/API";
import { useSignUpEmployee } from "../../../hooks";
import {
  noWhiteSpace,
  SignUpBtnText,
  SignUpType,
  TSignUpBtn,
} from "./EmployeeSignUp.helpers";

export const EmployeeSignUp = ({
  type = SignUpType.SELF_REGISTRATION,
}: {
  type?: TSignUpBtn;
}) => {
  const { error, isLoading, onSubmitActiveEmployee } = useSignUpEmployee({
    type,
  });
  const [form] = Form.useForm();

  const onFinish = (values: IEmployeeInfo) => {
    onSubmitActiveEmployee(values);
  };

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
