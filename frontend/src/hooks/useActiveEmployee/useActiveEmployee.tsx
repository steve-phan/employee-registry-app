import { message } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI, IEmployeeInfo } from "../../apis/API";
import {
  SignUpType,
  TSignUpBtn,
} from "../../Components/Account/EmployeeSignUp/EmployeeSignUp.helpers";
import { ROLE } from "../../Components/Employees/Employees.helpers";
import { toggleAddEmployeeModal } from "../../store/dashboard/dashboard.reducer";
import { useAppDispatch } from "../../store/hooks";
import {
  setActiveEmployee,
  setAllEmployees,
} from "../../store/user/user.reducer";

export const useActiveEmployee = ({ type }: { type: TSignUpBtn }) => {
  const dispatch = useAppDispatch();
  const [isSubmitSignUp, setIsSubmitSignUp] = useState(false);
  const [employeeSignUpInfo, setEmployeeSignUpInfo] = useState<IEmployeeInfo>();

  const { data, error, isLoading } = useQuery(
    ["signUpEmployee", isSubmitSignUp],
    () => {
      if (isSubmitSignUp && employeeSignUpInfo) {
        const password =
          type === SignUpType.ADD_EMPLOYEE
            ? "123456"
            : employeeSignUpInfo.password;
        return EmployeeAPI.signUp({
          employeeSignUpInfo: { ...employeeSignUpInfo, password },
        });
      }
    }
  );

  const onSubmitActiveEmployee = (values: IEmployeeInfo) => {
    setIsSubmitSignUp(true);
    setEmployeeSignUpInfo(values);
  };

  useEffect(() => {
    if (!isLoading && data && employeeSignUpInfo) {
      if (type === SignUpType.SELF_REGISTRATION) {
        // The temporary solution for running MongoDB in Docker.
        // For real projects, we can assign, and edit ROLE by GUI MongoDB
        const isCHEF: boolean = ["chef", "admin", "root"].includes(
          employeeSignUpInfo.userName.toLowerCase()
        );
        dispatch(
          setActiveEmployee({
            ...employeeSignUpInfo,
            role: [isCHEF ? ROLE.CHEF : ROLE.VERKÄUFER],
          })
        );
      } else {
        dispatch(setAllEmployees(data?.users));
      }

      message
        .success("register successfully", 0.5)
        .then(() => dispatch(toggleAddEmployeeModal(false)));
    }
    if (error) {
      message.error("register failed", 0.5);
      setIsSubmitSignUp(false);
    }
  }, [data, isLoading]);
  return {
    error,
    isLoading,
    onSubmitActiveEmployee,
  };
};
