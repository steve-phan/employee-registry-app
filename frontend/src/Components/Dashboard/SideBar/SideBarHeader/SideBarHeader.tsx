import { Row } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import { containerGroupSideBarStyles } from "../SideBar.styles";
import { ButtonWithIcon } from "../../../shared/ButtonWithIcon/ButtonWithIcon";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  setEmployeeInfoPage,
  toggleEmployeeDetails,
} from "../../../../store/dashboard/dashboard.reducer";

export const SideBarHeader = () => {
  const dispatch = useAppDispatch();
  const activeEmployee = useAppSelector(
    (state) => state.employee.activeEmployee
  );
  return (
    <div style={containerGroupSideBarStyles}>
      <Row gutter={[0, 12]}>
        <ButtonWithIcon
          icon={<HomeOutlined />}
          onClick={() => {
            dispatch(toggleEmployeeDetails(false));
          }}
        >
          Home
        </ButtonWithIcon>
        <ButtonWithIcon
          icon={<UserOutlined />}
          onClick={() => {
            dispatch(setEmployeeInfoPage(activeEmployee));
            dispatch(toggleEmployeeDetails(true));
          }}
        >
          My profile
        </ButtonWithIcon>
      </Row>
    </div>
  );
};
