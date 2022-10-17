import axios from "axios";

import { TROLE } from "../Components/Employees/Employees.helpers";

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
  _id: string;
}
export interface IFetchData {
  userInfo: IUserInfo;
}

export interface IComment {
  authorId: string;
  author: string;
  commentAt?: Date;
  content: string;
}

export interface IAddCommentProps {
  employeeId: string;
  comment: IComment;
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

  static async deleteEmployee({ email }: { email: string }) {
    const response = await axios.post(`${baseURL}/account/delete-employee`, {
      email,
    });
    return response.data;
  }

  static async editEmployee({ userInfo }: IFetchData) {
    const response = await axios.post(`${baseURL}/account/edit-employee`, {
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
  //***COMMENTS SECTION***

  static async addComment({ employeeId, comment }: IAddCommentProps) {
    const response = await axios.post(`${baseURL}/comment/add-comment`, {
      employeeId,
      comment,
    });
    return response.data;
  }

  static async getAllComments({ employeeId }: { employeeId: string }) {
    const response = await axios.post(`${baseURL}/comment/get-all-comments`, {
      employeeId,
    });
    return response.data;
  }
}
