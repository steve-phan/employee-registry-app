import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { connectMongoDB } from "./src/config/mogodb";
import userControler from "./src/controllers/user.controller";

dotenv.config();

const port = process.env.PORT || 2022;

const app = express();

connectMongoDB();

app.use(express.json());
app.use("/account", userControler);

// Handle error
app.use((err: Error, req: Request, res: Response) => {
  return res.status(500).json({ message: "Something gone wrong", error: err });
});

// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
