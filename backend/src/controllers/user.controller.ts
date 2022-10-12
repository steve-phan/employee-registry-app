import express, { Request, Response, NextFunction } from "express";

import { UserServices } from "../services/user.services";

const userRouters = express.Router();

userRouters.post(
  "/signup",
  (req: Request, res: Response, next: NextFunction) => {
    UserServices.signUp(req.body)
      .then(() => {
        res.status(200).json({ message: "SUCCESS" });
      })
      .catch((err) => next(err));
  }
);

userRouters.post(
  "/getAll",
  (req: Request, res: Response, next: NextFunction) => {
    UserServices.getAllEmployees()
      .then((users) => {
        res.status(200).json({ users });
      })
      .catch((err) => next(err));
  }
);

export default userRouters;
