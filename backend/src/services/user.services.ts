import bcrypt from "bcryptjs";

import User from "../models/user.model";

export interface IUserInfo {
  userName: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  address: string;
  role: string[];
}

export class UserServices {
  static async signUp(userInfo: IUserInfo) {
    const existUser = await User.findOne({
      $or: [{ userName: userInfo.userName }, { email: userInfo.email }],
    });
    if (existUser) {
      throw `UserName: ${userInfo.userName} or Email: ${userInfo.email} is already taken`;
    }
    const user = new User(userInfo);
    user.password = bcrypt.hashSync(userInfo.password, 10);
    await user.save();
  }

  static async getAllEmployees() {
    const allEmployees = await User.find().select("-password");
    return allEmployees;
  }
}
