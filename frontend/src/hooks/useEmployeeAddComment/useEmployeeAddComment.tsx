import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "../../apis/API";
import { setEmployeeComments } from "../../store/dashboard/dashboard.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const useEmployeeAddComment = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const { activeEmployee, employeeInfo } = useAppSelector((state) => ({
    activeEmployee: state.employee.activeEmployee,
    employeeInfo: state.dashboard.employeeDetails.employeeInfo,
  }));
  const { data, isLoading } = useQuery(
    ["comment/add-comment", submitting, value],
    () => {
      if (submitting && value) {
        return EmployeeAPI.addComment({
          employeeId: employeeInfo?._id,
          comment: {
            author: `${activeEmployee.firstName} ${activeEmployee.lastName}`,
            authorId: activeEmployee?._id,
            content: value,
          },
        });
      }
    }
  );

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
  };

  useEffect(() => {
    if (submitting && data?.allComents.comments) {
      dispatch(setEmployeeComments(data.allComents.comments));
      setSubmitting(false);
      setValue("");
    }
  }, [submitting, isLoading]);
  console.log({ value });
  return {
    handleSubmit,
    submitting,
    value,
    setValue,
  };
};
