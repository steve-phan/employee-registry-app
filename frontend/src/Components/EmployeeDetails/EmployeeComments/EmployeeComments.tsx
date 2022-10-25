import { Comment, List, Skeleton, Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { memo } from "react";

import { IComment } from "src/apis/API";
import { getRandomAvatarURL } from "src/Components/Employees/Employees.helpers";
import { useAppSelector } from "src/store/hooks";

dayjs.extend(relativeTime);

const EmployeeComments = () => {
  const employeeComments = useAppSelector(
    (state) => state.dashboard.employeeDetails.employeeComments || []
  );

  if (!employeeComments) {
    return <Skeleton active />;
  }
  const commentList = employeeComments?.map((comment: IComment) => {
    return {
      author: comment.author,
      avatar: getRandomAvatarURL(comment.authorId),
      content: <p>{comment.content}</p>,
      datetime: (
        <Tooltip>
          <span>{dayjs(comment.commentAt).fromNow()} </span>
          {/* <span>{dayjs(comment.commentAt).format("DD-MMM-YYYY")} </span> */}
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
