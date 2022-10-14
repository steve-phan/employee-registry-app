import { LoginOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSingOutActiveEmployee } from "../../../store/user/user.reducer";
import { ChefButtonsGroup } from "../ChefButtonsGroup/ChefButtonsGroup";
import { ROLE } from "../Employees/Employees.helpers";
import { AccountInfo } from "./AccountInfo";

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.employee.activeEmployee);
  return (
    <div
      style={{
        height: "100%",
        padding: "30px 8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AccountInfo />
      {role.includes(ROLE.CHEF) && <ChefButtonsGroup />}
      <Row gutter={[0, 12]}>
        <Button
          block
          danger
          icon={<LoginOutlined />}
          onClick={() => {
            dispatch(setSingOutActiveEmployee());
          }}
        >
          Sign out
        </Button>
      </Row>
    </div>
  );
};
