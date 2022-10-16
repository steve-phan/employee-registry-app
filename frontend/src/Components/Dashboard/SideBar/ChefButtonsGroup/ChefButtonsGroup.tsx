import { Row } from "antd";
import { EditOutlined, CloudUploadOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
} from "../../../../store/dashboard/dashboard.reducer";
import { ROLE } from "../../../Employees/Employees.helpers";
import { ButtonWithIcon } from "../../../shared/ButtonWithIcon/ButtonWithIcon";

export const ChefButtonsGroup = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.employee.activeEmployee);

  if (!role.includes(ROLE.CHEF)) {
    return null;
  }

  return (
    <Row gutter={[0, 12]}>
      <ButtonWithIcon
        icon={<CloudUploadOutlined />}
        onClick={() => {
          dispatch(toggleUploadCSVFILEEMPLOYEEModal(true));
        }}
      >
        Upload Employee file?
      </ButtonWithIcon>
      <ButtonWithIcon
        icon={<EditOutlined />}
        onClick={() => {
          dispatch(toggleAddEmployeeModal(true));
        }}
      >
        Add employee?
      </ButtonWithIcon>
    </Row>
  );
};
