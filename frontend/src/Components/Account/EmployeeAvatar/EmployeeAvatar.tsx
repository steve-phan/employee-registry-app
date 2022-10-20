import { Avatar } from "antd";
import { useMemo } from "react";

import { getRandomAvatarURL } from "src/Components/Employees/Employees.helpers";

import { employeeAvatarStyles } from "./EmployeeAvatar.styles";

export const EmployeeAvatar = ({ employeeId }: { employeeId: string }) => {
  const employeeAvatarURL = useMemo(
    () => getRandomAvatarURL(employeeId),
    [employeeId]
  );

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
