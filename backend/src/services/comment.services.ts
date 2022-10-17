import Comment from "../models/comment.model";

interface IAddComment {
  employeeId: string;
  comment: {
    authorId: string;
    author: string;
    content: string;
  };
}

export class CommentServices {
  static async getAllComments({ employeeId }: { employeeId: string }) {
    const allComents = await Comment.find({ employeeId });
    return allComents[0];
  }

  static async addComment(commentInfo: IAddComment) {
    const {
      employeeId,
      comment: { author, authorId, content },
    } = commentInfo;

    const employeeComments = await Comment.findOne({ employeeId });

    if (!employeeComments) {
      const newComment = new Comment({
        employeeId,
        comments: [],
      });
      await newComment.save();
    }

    await Comment.updateOne(
      { employeeId },
      {
        $push: {
          comments: { author, authorId, content, commentAt: new Date() },
        },
      }
    );

    return await this.getAllComments({ employeeId });
  }
}
