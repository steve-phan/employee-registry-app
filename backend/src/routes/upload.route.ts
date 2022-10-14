import express from "express";

import { UploadControler } from "../controllers/upload.controller";
import { upload } from "../middlewares/upload.middlewares";

const uploadRouter = express.Router();

uploadRouter.post(
  "/employeefile",
  upload.array("files[]", 12),
  UploadControler.readCSVFile
);

export default uploadRouter;
