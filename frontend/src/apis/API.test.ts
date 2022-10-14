import axios from "axios";

import { ROLE } from "../Components/Dashboard/Employees/Employees.helpers";

import { EmployeeAPI, IUserInfo } from "./API";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("EmployeeAPI", () => {
  describe("getAllEmployees", () => {
    it("should return a collect of Employees", async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{ userName: "perterson" }, { userName: "steve" }],
      });
      const users = await EmployeeAPI.getAllEmployees();
      expect(users.length).toBe(2);
    });
  });

  describe("signUp", () => {
    const mockUserInfo: IUserInfo = {
      userName: "Teddy",
      firstName: "VU NAM",
      lastName: "PHAN",
      email: "pvn2022@gmail.com",
      address: "Berliner str 2, 10101",
      password: "verySecretPass",
      role: [ROLE.VERKÄUFER],
    };
    it("should return a SUCCESS message", async () => {
      mockedAxios.post.mockResolvedValue({
        data: { message: "SUCCESS" },
      });
      const response = await EmployeeAPI.signUp({ userInfo: mockUserInfo });
      expect(response.message).toBe("SUCCESS");
    });
  });
});
