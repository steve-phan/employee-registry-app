import express, { Request, Response, NextFunction } from "express";

import { CommentServices } from "../services/comment.services";

export class CommentControler {
  static async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { employeeId } = req.body;
      const allComents = await CommentServices.getAllComments({ employeeId });
      res.status(200).json({ allComents, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }

  static async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      //   const { employeeId, comment } = req.body;
      const allComents = await CommentServices.addComment(req.body);
      res.status(200).json({ comments: allComents, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }
}
