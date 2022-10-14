import express, { Request, Response, NextFunction } from "express";

import { UserControler } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/get-all-employees", UserControler.getAllEmployees);
userRouter.post("/signin", UserControler.signIn);
userRouter.post("/signup", UserControler.signUp);
userRouter.post("/delete-employee", UserControler.deleteEmployee);
userRouter.post("/edit-employee", UserControler.editEmployee);

export default userRouter;
