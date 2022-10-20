import { message } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI, IEmployeeInfo } from "src/apis/API";
import { setAllEmployees, toggleEditEmployeeModal } from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const useEditEmployee = () => {
  const [isSubmitEdit, setIsSubmitEdit] = useState(false);
  const currentInActionEmployee = useAppSelector(
    (state) => state.dashboard.currentInActionEmployee
  );
  const [employeeSignUpInfo, setEmployeeSignUpInfo] = useState<IEmployeeInfo>(
    currentInActionEmployee
  );
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery(
    ["signUpEmployee", employeeSignUpInfo, isSubmitEdit],
    () => {
      if (isSubmitEdit && employeeSignUpInfo) {
        return EmployeeAPI.editEmployee({ employeeSignUpInfo });
      }
    }
  );
  useEffect(() => {
    if (isSubmitEdit && !isLoading && data) {
      dispatch(setAllEmployees(data?.users));
      message
        .success(`edit ${employeeSignUpInfo.userName} successfully.`, 0.5)
        .then(() => {
          setIsSubmitEdit(false);
          dispatch(toggleEditEmployeeModal(false));
        });
    }

    if (error) {
      message.error(`edit ${employeeSignUpInfo.userName} failed.`, 0.5);
    }
  }, [data, isLoading]);

  const onSubmitEditEmployee = (values: IEmployeeInfo) => {
    setIsSubmitEdit(true);
    setEmployeeSignUpInfo(values);
  };
  return {
    onSubmitEditEmployee,
    currentInActionEmployee,
    isLoading,
    error,
  };
};
