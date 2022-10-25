import { Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AnyAction, Dispatch } from "redux";

import { IEmployee, ROLE } from "src/@types";
import { IEmployeeInfo } from "src/apis/API";
import {
  setCurrentInActionEmployee,
  setEmployeeInfoPage,
  toggleDeleteEmployeeModal,
  toggleEditEmployeeModal,
  toggleEmployeeDetails,
} from "src/store";

export const EmployeeColor = {
  [ROLE.EINKÄUFER]: "geekblue",
  [ROLE.VERKÄUFER]: "green",
  [ROLE.CHEF]: "volcano",
} as const;

export const getActionColumn = (dispatch: Dispatch<AnyAction>) => ({
  title: "Action",
  dataIndex: "action",
  key: "action",
  ellipsis: true,
  render: (_: any, employee: IEmployeeInfo) => (
    <Space size="middle">
      <span
        className="action_button"
        onClick={() => {
          dispatch(toggleEditEmployeeModal(true));
          dispatch(setCurrentInActionEmployee(employee));
        }}
      >
        Edit
      </span>
      <span
        onClick={() => {
          dispatch(toggleDeleteEmployeeModal(true));
          dispatch(setCurrentInActionEmployee(employee));
        }}
        className="action_button"
      >
        Delete
      </span>
    </Space>
  ),
});

export const getColumnsEmployee = (
  dispatch: Dispatch<AnyAction>
): ColumnsType<IEmployee> => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (userInfo) => {
        return (
          <span
            className="view_button"
            onClick={() => {
              dispatch(setEmployeeInfoPage(userInfo));
              dispatch(toggleEmployeeDetails(true));
            }}
          >
            {userInfo.firstName + " " + userInfo.lastName}
          </span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      responsive: ["md"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      responsive: ["lg"],
    },
    {
      title: "Role",
      key: "role",
      ellipsis: true,
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
};

export const getRandomAvatarURL = (employeeId: string) => {
  const avatarId = Number(employeeId?.replace(/[^0-9]/g, ""));

  return `https://joeschmoe.io/api/v1/${
    avatarId / 2 === 0 ? "male" : "female"
  }/${avatarId}`;
};

export const modifyEmployee = (employees: IEmployeeInfo[]) =>
  [...employees]
    .sort((a, b) => a.firstName.charCodeAt(0) - b.firstName.charCodeAt(0))
    .map((employee, index) => {
      return {
        ...employee,
        name: employee,
        key: `${index}_${employee.email}`,
      };
    });
