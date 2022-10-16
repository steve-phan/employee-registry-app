import { Row } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import { containerGroupSideBarStyles } from "../SideBar.styles";
import { ButtonWithIcon } from "../../../shared/ButtonWithIcon/ButtonWithIcon";

export const SideBarHeader = () => {
  return (
    <div style={containerGroupSideBarStyles}>
      <Row gutter={[0, 12]}>
        <ButtonWithIcon icon={<HomeOutlined />} onClick={() => {}}>
          Home
        </ButtonWithIcon>
        <ButtonWithIcon icon={<UserOutlined />} onClick={() => {}}>
          My profile
        </ButtonWithIcon>
      </Row>
    </div>
  );
};
