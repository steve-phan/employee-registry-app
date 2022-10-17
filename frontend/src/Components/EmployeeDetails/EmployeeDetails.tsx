import { Skeleton } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { EmployeeAPI } from "../../apis/API";
import { setEmployeeComments } from "../../store/dashboard/dashboard.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { EmployeeAddComment } from "./EmployeeAddComment/EmployeeAddComment";
import EmployeeComments from "./EmployeeComments/EmployeeComments";
import { wrapCommentStyles } from "./EmployeeDetails.styles";
import { EmployeeDetailsBreadcrumb } from "./EmployeeDetailsBreadcrumb/EmployeeDetailsBreadcrumb";
import { EmployeeDetailsHeader } from "./EmployeeDetailsHeader/EmployeeDetailsHeader";

export const EmployeeDetails = () => {
  const dispatch = useAppDispatch();
  const { employeeInfo } = useAppSelector((state) => ({
    employeeInfo: state.dashboard.employeeDetails.employeeInfo,
  }));

  const { data, isLoading } = useQuery(
    ["comment/get-all-comments", employeeInfo._id],
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
