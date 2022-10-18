import mongoose from "mongoose";
const Schema = mongoose.Schema;

const detailsCommentSchema = {
  authorId: String,
  author: String,
  commentAt: Date,
  content: String,
};

const commentSchema = new Schema({
  employeeId: String,
  comments: [detailsCommentSchema],
});

export default mongoose.model("Comment", commentSchema);
