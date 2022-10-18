import { Request, Response, NextFunction } from "express";

import { UploadServices } from "../services/upload.services";

export class UploadControler {
  static async readCSVFile(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      const fileName = files[0].filename;
      const fileContentData = await UploadServices.readCSVFile(fileName);
      return res
        .status(200)
        .json({ message: "success", users: fileContentData });
    } catch (error) {
      next(error);
    }
  }
}
