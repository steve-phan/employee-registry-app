import { Avatar, Tag } from "antd";

import { useAppSelector } from "../../../store/hooks";
import {
  EmployeeColor,
  getRandomAvatarURL,
} from "../Employees/Employees.helpers";
import { accountInfoStyles } from "./AccountInfo.styles";

export const AccountInfo = () => {
  const { firstName, lastName, role } = useAppSelector(
    (state) => state.employee.activeEmployee
  );
  return (
    <div
      style={{
        ...accountInfoStyles,
      }}
    >
      <Avatar src={getRandomAvatarURL()} />
      <div>{`${firstName} ${lastName}`}</div>
      {role.map((tag, index) => (
        <Tag key={index} color={EmployeeColor[tag]}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
