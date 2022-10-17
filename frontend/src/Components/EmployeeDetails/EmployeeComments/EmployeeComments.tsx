import { memo } from "react";
import { Comment, List, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "react-query";
import { EmployeeAPI, IComment } from "../../../apis/API";
import { useAppSelector } from "../../../store/hooks";

import { getRandomAvatarURL } from "../../Employees/Employees.helpers";

dayjs.extend(relativeTime);

const EmployeeComments = ({ newcomment }: { newcomment: boolean }) => {
  const { employeeInfo } = useAppSelector((state) => ({
    employeeInfo: state.dashboard.employeeDetails.employeeInfo,
  }));
  const { data, isLoading } = useQuery(
    ["comment/get-all-comments", employeeInfo._id, newcomment],
    () =>
      EmployeeAPI.getAllComments({
        employeeId: employeeInfo?._id,
      })
  );
  const allComment = data?.allComents as { comments: IComment[] };

  if (isLoading) {
    return <p>Comments is loading....</p>;
  }

  if (!allComment || allComment?.comments?.length === 0) {
    return <p>There is no comments</p>;
  }
  const commentList = allComment?.comments?.map((comment: IComment) => {
    return {
      author: comment.author,
      avatar: getRandomAvatarURL(comment.authorId),
      content: <p>{comment.content}</p>,
      datetime: (
        <Tooltip>
          <span>{dayjs(comment.commentAt).fromNow()} </span>
        </Tooltip>
      ),
    };
  });

  return (
    <List
      className="comment-list"
      header={`${commentList.length} comments`}
      itemLayout="horizontal"
      dataSource={commentList}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    />
  );
};

export default memo(EmployeeComments);
