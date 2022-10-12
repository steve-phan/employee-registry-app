import axios from "axios";

export interface IUserInfo {
  userName: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  address: string;
  role: string[];
}

interface IFetchData {
  userInfo: IUserInfo;
}

const baseURL = `http://localhost:2022/account`;

export class EmployeeAPI {
  static async getAllEmployees({ userInfo }: IFetchData) {
    const response = await axios.post(`${baseURL}/getAll`, userInfo);
    return response.data;
  }
}
