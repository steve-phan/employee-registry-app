import { Skeleton } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "src/apis/API";
import { setEmployeeComments } from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

import { EmployeeAddComment } from "./EmployeeAddComment/EmployeeAddComment";
import EmployeeComments from "./EmployeeComments/EmployeeComments";
import { wrapCommentStyles } from "./EmployeeDetails.styles";
import { EmployeeDetailsBreadcrumb } from "./EmployeeDetailsBreadcrumb/EmployeeDetailsBreadcrumb";
import { EmployeeDetailsHeader } from "./EmployeeDetailsHeader/EmployeeDetailsHeader";

export const EmployeeDetails = () => {
  const dispatch = useAppDispatch();
  const { employeeInfo, employeeComments } = useAppSelector((state) => ({
    employeeInfo: state.dashboard.employeeDetails.employeeInfo,
    employeeComments: state.dashboard.employeeDetails.employeeComments,
  }));

  const { data, isLoading } = useQuery(
    ["comment/get-all-comments", employeeInfo._id, employeeComments],
    () =>
      EmployeeAPI.getAllComments({
        employeeId: employeeInfo._id,
      })
  );

  useEffect(() => {
    if (data) {
      dispatch(setEmployeeComments(data.allComments?.comments));
    }
  }, [employeeInfo._id, isLoading]);

  return (
    <div>
      <EmployeeDetailsBreadcrumb />
      <EmployeeDetailsHeader />
      <div style={wrapCommentStyles}>
        {isLoading ? <Skeleton active /> : <EmployeeComments />}
        <EmployeeAddComment />
      </div>
    </div>
  );
};
