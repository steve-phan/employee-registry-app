import { message } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "src/apis/API";
import { setAllEmployees, toggleDeleteEmployeeModal } from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const useDeleteEmployee = () => {
  const [isSubmitDelete, setIsSubmitDelete] = useState(false);
  const dispatch = useAppDispatch();
  const { email, firstName, lastName } = useAppSelector(
    (state) => state.dashboard.currentInActionEmployee
  );
  const { data, error } = useQuery(["deleteEmployee", isSubmitDelete], () => {
    if (isSubmitDelete) {
      return EmployeeAPI.deleteEmployee({ email });
    }
  });
  const handleDeleteEmployee = () => {
    setIsSubmitDelete(true);
  };
  useEffect(() => {
    if (data) {
      message
        .success(`delete ${firstName + " " + lastName} successfully.`, 0.5)
        .then(() => {
          setIsSubmitDelete(false);
          dispatch(setAllEmployees(data?.users));
          dispatch(toggleDeleteEmployeeModal(false));
        });
    }
    if (error) {
      message.error(`delete ${firstName + " " + lastName} failed.`, 0.5);
    }
  }, [data, dispatch]);

  return {
    handleDeleteEmployee,
    employeeFullname: firstName + " " + lastName,
  };
};
