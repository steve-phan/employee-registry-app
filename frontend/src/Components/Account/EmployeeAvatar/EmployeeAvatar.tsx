import { Avatar } from "antd";
import { useMemo } from "react";

import { getRandomAvatarURL } from "../../Employees/Employees.helpers";
import { employeeAvatarStyles } from "./EmployeeAvatar.styles";

export const EmployeeAvatar = () => {
  const employeeAvatarURL = useMemo(getRandomAvatarURL, []);
  return (
    <div
      style={{
        ...employeeAvatarStyles,
      }}
    >
      <Avatar src={employeeAvatarURL} style={{ display: "block" }} size={46} />
    </div>
  );
};
