import express from "express";

import { CommentControler } from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/get-all-comments", CommentControler.getAllComments);
commentRouter.post("/add-comment", CommentControler.addComment);

export default commentRouter;
