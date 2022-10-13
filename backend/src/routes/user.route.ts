import express, { Request, Response, NextFunction } from "express";

import { UserControler } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/get-all-employees", UserControler.getAllEmployees);
userRouter.post("/signup", UserControler.signUp);

export default userRouter;
