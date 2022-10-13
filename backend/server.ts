import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { connectMongoDB } from "./src/config/mogodb";
import userRouter from "./src/routes/user.route";

dotenv.config();

const port = process.env.PORT || 2022;

const app = express();

connectMongoDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/account", userRouter);

// Handle error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: "Something gone wrong", error: err });
});

// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
