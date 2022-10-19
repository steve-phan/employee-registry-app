import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI, IEmployeeSignInInfo } from "../../apis/API";
import { useAppDispatch } from "../../store/hooks";
import { setActiveEmployee } from "../../store/user/user.reducer";

export const useSignInEmployee = () => {
  const [employeeSignInInfo, setEmployeeSignInInfo] =
    useState<IEmployeeSignInInfo>();
  // const { error, isLoading, onSubmitActiveEmployee } = useActiveEmployee({
  //   type,
  // });
  const [isSubmitSignIn, setIsSubmitSignIn] = useState(false);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery(
    ["signInEmployee", employeeSignInInfo, isSubmitSignIn],
    () => {
      if (isSubmitSignIn && employeeSignInInfo) {
        return EmployeeAPI.signIn({ employeeSignInInfo });
      }
    }
  );

  const onSubmitActiveEmployee = (values: any) => {
    setIsSubmitSignIn(true);
    setEmployeeSignInInfo(values);
  };

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setActiveEmployee({ ...data.user }));
    }
    if (error) {
      message.error("SignIn failed").then(() => setIsSubmitSignIn(false));
    }
  }, [data, isLoading, dispatch, employeeSignInInfo]);

  return {
    onSubmitActiveEmployee,
    isLoading,
    error,
  };
};
