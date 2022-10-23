import { Button, Form, Input } from "antd";

import { IEmployeeInfo } from "src/apis/API";
import { noWhiteSpace } from "src/Components/Account/EmployeeSignUp/EmployeeSignUp.helpers";
import { useEditEmployee } from "src/hooks";

export const EditEableForm = () => {
  const { onSubmitEditEmployee, isLoading, currentInActionEmployee } =
    useEditEmployee();
  const [form] = Form.useForm();

  const onFinish = (values: IEmployeeInfo) => {
    onSubmitEditEmployee(values);
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={currentInActionEmployee}
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
          <Input disabled />
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
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please input your first Name!" }]}
        >
          <Input contentEditable />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last Name!" }]}
        >
          <Input contentEditable />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your Address!" }]}
        >
          <Input contentEditable />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Form.Item>
        <Form.Item></Form.Item>
      </Form>
    </>
  );
};
