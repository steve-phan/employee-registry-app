import axios from "axios";

const ROLE = {
  EMPLOYEE: "EMPLOYEE",
  MANAGER: "MANAGER",
} as const;

type TROLE = keyof typeof ROLE;
export interface IUserInfo {
  userName: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  address: string;
  role: TROLE[];
}

interface IFetchData {
  userInfo: IUserInfo;
}

const baseURL = `http://localhost:2022/account`;

export class EmployeeAPI {
  static async getAllEmployees() {
    const response = await axios.get(`${baseURL}/get-all-employees`);
    return response.data;
  }

  static async signUp({ userInfo }: IFetchData) {
    const response = await axios.post(`${baseURL}/signup`, { userInfo });
    return response.data;
  }
}
