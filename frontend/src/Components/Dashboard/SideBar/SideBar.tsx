import { LoginOutlined } from "@ant-design/icons";
import { Row, Divider } from "antd";

import { useAppDispatch } from "../../../store/hooks";
import { setSingOutActiveEmployee } from "../../../store/user/user.reducer";
import { ButtonWithIcon } from "../../shared/ButtonWithIcon/ButtonWithIcon";
import { ChefButtonsGroup } from "./ChefButtonsGroup/ChefButtonsGroup";
import { containerGroupSideBarStyles } from "./SideBar.styles";
import { SideBarHeader } from "./SideBarHeader/SideBarHeader";

export const SideBar = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        ...containerGroupSideBarStyles,
        height: "100%",
        padding: "30px 8px 0",
      }}
    >
      <div>
        <SideBarHeader />
        <Divider style={{ background: "#cecece" }} />
        <ChefButtonsGroup />
      </div>
      <Row>
        <ButtonWithIcon
          icon={<LoginOutlined />}
          onClick={() => {
            dispatch(setSingOutActiveEmployee());
          }}
        >
          Sign out
        </ButtonWithIcon>
      </Row>
    </div>
  );
};
