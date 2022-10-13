import { Avatar, Tag } from "antd";

import { ROLE } from "../../../apis/API";

import { useAppSelector } from "../../../store/hooks";

const AccountInfo = () => {
  const { firstName, lastName, role } = useAppSelector(
    (state) => state.employee.activeEmployee
  );
  return (
    <div>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <div>{`${firstName} ${lastName}`}</div>
      {role.map((tag, index) => (
        <Tag key={index} color={tag === ROLE.EMPLOYEE ? "green" : "volcano"}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};

export default AccountInfo;
