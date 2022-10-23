import { Row } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ButtonWithIcon } from "src/Components/shared/ButtonWithIcon/ButtonWithIcon";
import { setEmployeeInfoPage, toggleEmployeeDetails } from "src/store";

import { containerGroupSideBarStyles } from "../SideBar.styles";

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
