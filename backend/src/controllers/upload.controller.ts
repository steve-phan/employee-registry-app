import express, { Request, Response, NextFunction } from "express";
import multer from "multer";

import { UploadServices } from "../services/upload.services";

import { UserServices } from "../services/user.services";

const upload = multer({ dest: "uploads/" });

export class UploadControler {
  static uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      const fileName = files[0].filename;
      console.log({ fileName });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }
}
