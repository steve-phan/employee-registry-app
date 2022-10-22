import { screen } from "@testing-library/react";

import { useSignInEmployee } from "../../../hooks";
import { render } from "../../../test";
import { EmployeeSignIn } from "./EmployeeSignIn";

jest.mock("../../../hooks", () => ({
  useSignInEmployee: jest.fn(),
}));

const useSignInEmployeeMock = useSignInEmployee as jest.Mock;
describe("EmployeeSignIn", () => {
  it("should render Login Button", () => {
    useSignInEmployeeMock.mockReturnValue({
      onSubmitActiveEmployee: (a: string) => {},
      isLoading: false,
      error: false,
    });
    render(<EmployeeSignIn />);
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });
  it("should render an error when there is an error", () => {
    useSignInEmployeeMock.mockReturnValue({
      onSubmitActiveEmployee: (a: string) => {},
      isLoading: false,
      error: "something wrong",
    });
    render(<EmployeeSignIn />);
    const errorElement = screen.queryByTestId("signin-error-test-id");
    expect(errorElement).toBeInTheDocument();
  });
});
