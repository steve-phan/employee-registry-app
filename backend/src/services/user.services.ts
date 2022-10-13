import bcrypt from "bcryptjs";

import User from "../models/user.model";

const ROLE = {
  EMPLOYEE: "EMPLOYEE",
  MANAGER: "MANAGER",
} as const;

type TROLE = keyof typeof ROLE;
export interface ISignInInfo {
  userName: string;
  password: string;
}

export interface IUserInfo extends ISignInInfo {
  email: string;
  lastName: string;
  firstName: string;
  address: string;
  role: TROLE[];
}

export class UserServices {
  static async signIn({ signInInfo }: { signInInfo: ISignInInfo }) {
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

  static async signUp({ userInfo }: { userInfo: IUserInfo }) {
    const existUser = await User.findOne({
      $or: [{ userName: userInfo.userName }, { email: userInfo.email }],
    });
    if (existUser) {
      throw `UserName: ${userInfo.userName} or Email: ${userInfo.email} is already taken`;
    }
    const user = new User({ ...userInfo, role: [ROLE.EMPLOYEE] });
    user.password = bcrypt.hashSync(userInfo.password, 10);
    await user.save();
  }

  static async getAllEmployees() {
    const allEmployees = await User.find().select("-password");
    return allEmployees;
  }
}
