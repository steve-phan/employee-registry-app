import { Button, Form, Input } from "antd";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI, IUserInfo } from "../../../apis/API";
import { toggleEditEmployeeModal } from "../../../store/dashboard/dashboard.reducer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAllEmployees } from "../../../store/user/user.reducer";
import { noWhiteSpace } from "../../Account/SignUp/SignUp.helpers";

export const EditEableForm = () => {
  const [isSubmitEdit, setIsSubmitEdit] = useState(false);
  const currentInActionEmployee = useAppSelector(
    (state) => state.dashboard.currentInActionEmployee
  );
  const [userInfo, setUserInfo] = useState<IUserInfo>(currentInActionEmployee);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery(
    ["signUpEmployee", userInfo],
    () => {
      if (isSubmitEdit && userInfo) {
        return EmployeeAPI.editEmployee({ userInfo });
      }
    }
  );
  const [form] = Form.useForm();

  const onFinish = (values: IUserInfo) => {
    setIsSubmitEdit(true);
    setUserInfo(values);
  };

  useEffect(() => {
    if (isSubmitEdit && !isLoading && data) {
      dispatch(setAllEmployees(data?.users));
      message
        .success(`edit ${userInfo.userName} successfully.`, 0.5)
        .then(() => {
          setIsSubmitEdit(false);
          dispatch(toggleEditEmployeeModal(false));
        });
    }

    if (error) {
      message.error(`edit ${userInfo.userName} failed.`, 0.5);
    }
  }, [data, isLoading]);

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
            // loading={isLoading}
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
