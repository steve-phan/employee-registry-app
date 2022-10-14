import express, { Request, Response, NextFunction } from "express";

import { UserServices } from "../services/user.services";

export class UserControler {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserServices.signIn(req.body);
      res.status(200).json({ user, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.signUp(req.body);
      res.status(200).json({ message: "SUCCESS", users });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.deleteEmployee(req.body);
      res.status(200).json({ message: "SUCCESS", users });
    } catch (error) {
      next(error);
    }
  }

  static async editEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.editEmployee(req.body);
      res.status(200).json({ message: "SUCCESS", users });
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
      res.status(200).json({ message: "SUCCESS", users });
    } catch (error) {
      next(error);
    }
  }
}
