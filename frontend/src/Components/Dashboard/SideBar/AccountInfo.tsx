import { Avatar, Tag } from "antd";

import { useAppSelector } from "../../../store/hooks";
import { EmployeeColor } from "../Employees/Employees.helpers";

const AccountInfo = () => {
  const { firstName, lastName, role } = useAppSelector(
    (state) => state.employee.activeEmployee
  );
  return (
    <div>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <div>{`${firstName} ${lastName}`}</div>
      {role.map((tag, index) => (
        <Tag key={index} color={EmployeeColor[tag]}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};

export default AccountInfo;
