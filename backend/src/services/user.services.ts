import bcrypt from "bcryptjs";

import User, { ROLE } from "../models/user.model";

type TROLE = keyof typeof ROLE;
export interface IEmployeeSignInInfo {
  userName: string;
  password: string;
}

export interface IEmployeeInfo extends IEmployeeSignInInfo {
  email: string;
  lastName: string;
  firstName: string;
  address: string;
  role: TROLE[];
}

export class UserServices {
  static async signIn({ signInInfo }: { signInInfo: IEmployeeSignInInfo }) {
    const user = await User.findOne({ userName: signInInfo.userName });
    if (user && bcrypt.compareSync(signInInfo.password, user.password)) {
      const { password, ...userInfo } = user.toObject();
      return {
        ...userInfo,
      };
    } else {
      throw `UserName or Password is wrong, please try again!`;
    }
    // TODO: using jwt library to send token back to client
  }

  static async signUp({ userInfo }: { userInfo: IEmployeeInfo }) {
    const existUser = await User.findOne({
      $or: [{ userName: userInfo.userName }, { email: userInfo.email }],
    });
    if (existUser) {
      throw `UserName: ${userInfo.userName} or Email: ${userInfo.email} is already taken`;
    }
    const user = new User({ ...userInfo, role: [ROLE.VERKÄUFER] });
    user.password = bcrypt.hashSync(userInfo.password, 10);
    await user.save();

    return await this.getAllEmployees();
  }
  static async deleteEmployee({ email }: { email: string }) {
    await User.deleteOne({ email });
    return await this.getAllEmployees();
  }

  static async editEmployee({ userInfo }: { userInfo: IEmployeeInfo }) {
    await User.findOneAndUpdate({ email: userInfo.email }, userInfo);
    return await this.getAllEmployees();
  }

  static async getAllEmployees() {
    const allEmployees = await User.find().select("-password");
    return allEmployees;
  }
}
