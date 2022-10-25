import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { EmployeeAPI } from "../../apis/API";
import { useDeleteEmployee } from "./useDeleteEmployee";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../../store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn().mockReturnValue({
    firstName: "Tom",
    lastName: "Cruise",
    email: "tomcruise@gmail.com",
  }),
}));

const subject = () => renderHook(() => useDeleteEmployee(), { wrapper });

describe("useDeleteEmployee", () => {
  it("should call API when submit delete employee", async () => {
    const { result } = subject();

    const deleteSpy = jest.spyOn(EmployeeAPI, "deleteEmployee");
    act(() => {
      result.current.handleDeleteEmployee();
    });
    expect(deleteSpy).toHaveBeenCalled();
  });
  it("should call correctly", () => {
    const { result } = subject();
    act(() => {
      result.current.handleDeleteEmployee();
    });
    expect(result).not.toBeNull();
    expect(result.current.employeeFullname).toEqual("Tom Cruise");
  });
});
