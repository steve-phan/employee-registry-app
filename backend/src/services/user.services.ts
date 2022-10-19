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
  static async signIn({
    employeeSignInInfo,
  }: {
    employeeSignInInfo: IEmployeeSignInInfo;
  }) {
    const user = await User.findOne({ userName: employeeSignInInfo.userName });
    if (
      user &&
      bcrypt.compareSync(employeeSignInInfo.password, user.password)
    ) {
      const { password, ...userInfo } = user.toObject();
      return {
        ...userInfo,
      };
    } else {
      throw `UserName or Password is wrong, please try again!`;
    }
    // TODO: using jwt library to send token back to client
  }

  static async signUp({
    employeeSignUpInfo,
  }: {
    employeeSignUpInfo: IEmployeeInfo;
  }) {
    const existUser = await User.findOne({
      $or: [
        { userName: employeeSignUpInfo.userName },
        { email: employeeSignUpInfo.email },
      ],
    });
    if (existUser) {
      throw `UserName: ${employeeSignUpInfo.userName} or Email: ${employeeSignUpInfo.email} is already taken`;
    }
    const user = new User({
      ...employeeSignUpInfo,
      role: [ROLE.VERKÄUFER],
    });
    user.password = bcrypt.hashSync(employeeSignUpInfo.password, 10);
    await user.save();

    return await this.getAllEmployees();
  }
  static async deleteEmployee({ email }: { email: string }) {
    await User.deleteOne({ email });
    return await this.getAllEmployees();
  }

  static async editEmployee({
    employeeSignUpInfo,
  }: {
    employeeSignUpInfo: IEmployeeInfo;
  }) {
    await User.findOneAndUpdate(
      { email: employeeSignUpInfo.email },
      employeeSignUpInfo
    );
    return await this.getAllEmployees();
  }

  static async getAllEmployees() {
    const allEmployees = await User.find().select("-password");
    return allEmployees;
  }
}
