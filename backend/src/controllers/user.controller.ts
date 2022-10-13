import express, { Request, Response, NextFunction } from "express";

import { UserServices } from "../services/user.services";

export class UserControler {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      await UserServices.signUp(req.body);
      res.status(200).json({ message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }

  static async getAllEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await UserServices.getAllEmployees();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }
}
