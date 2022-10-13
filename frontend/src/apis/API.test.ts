import { EmployeeAPI } from "./API";
import axios from "axios";

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
});
