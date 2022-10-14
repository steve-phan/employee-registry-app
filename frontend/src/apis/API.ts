import axios from "axios";

export const ROLE = {
  EMPLOYEE: "EMPLOYEE",
  MANAGER: "MANAGER",
} as const;

export type TROLE = keyof typeof ROLE;

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
export interface IFetchData {
  userInfo: IUserInfo;
}

const baseURL = `http://localhost:2022`;

export class EmployeeAPI {
  static async getAllEmployees() {
    const response = await axios.get(`${baseURL}/account/get-all-employees`);
    return response.data;
  }

  static async signIn({ signInInfo }: { signInInfo: ISignInInfo }) {
    const response = await axios.post(`${baseURL}/account/signin`, {
      signInInfo,
    });
    return response.data;
  }

  static async signUp({ userInfo }: IFetchData) {
    const response = await axios.post(`${baseURL}/account/signup`, {
      userInfo,
    });
    return response.data;
  }

  static async uploadCSVEmployeeFile({ formData }: { formData: FormData }) {
    const response = await axios.post(
      `${baseURL}/upload/employeefile`,
      formData
    );
    return response.data;
  }
}
