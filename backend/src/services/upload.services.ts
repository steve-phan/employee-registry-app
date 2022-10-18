import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import bcrypt from "bcryptjs";

import User from "../models/user.model";

interface IColums {
  Vorname: string;
  Nachname: string;
  Strasse: string;
  Nr: string;
  PLZ: string;
  Ort: string;
  Land: string;
  Rolle: string;
}

const headers = [
  "Vorname",
  "Nachname",
  "Strasse",
  "Nr",
  "PLZ",
  "Ort",
  "Land",
  "Rolle",
];
export class UploadServices {
  static async readCSVFile(fileName: string) {
    const pathName = path.resolve(__dirname, `../../uploads/${fileName}`);
    const fileContent = fs.readFileSync(pathName, { encoding: "utf8" });
    const fileContentData = (await parse(fileContent, {
      delimiter: ";",
      columns: headers,
    })) as IColums[];

    fileContentData.shift();

    await this.writeEmloyeesToDB(fileContentData);

    return await User.find().select("-password");
  }

  static async writeEmloyeesToDB(fileContentData: IColums[]) {
    const mappedContentData = fileContentData.map((item, index) => {
      const { Vorname, Nachname, Strasse, Nr, PLZ, Ort, Land, Rolle } = item;
      const address = `${Strasse} ${Nr}, ${PLZ} ${Ort} ${Land}`;

      // TODO: assign `unique` userName and `unique` email  and default password
      // Potencial solution: uuid4

      const uniqueNumber = Math.floor(Math.random() * (10000 + 1));
      const userName =
        `${Vorname.trim()}-${Nachname.trim()}-${uniqueNumber}`.toLowerCase();
      const email = `employee-${uniqueNumber}@amzing-gmbg.com`;
      const password = bcrypt.hashSync("123456", 10);

      return {
        userName,
        address,
        email,
        password,
        lastName: Vorname,
        firstName: Nachname,
        role: [Rolle.toUpperCase()],
      };
    });

    await User.insertMany(mappedContentData);
  }
}
