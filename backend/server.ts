import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { connectMongoDB } from "./src/config/mogodb";
import userRouter from "./src/routes/user.route";
import uploadRouter from "./src/routes/upload.route";

dotenv.config();

const port = process.env.PORT || 2022;

const app = express();

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/account", userRouter);
app.use("/upload", uploadRouter);

// Handle error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(500)
    .json({ message: "Something gone wrong", error: err.message });
});

// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
