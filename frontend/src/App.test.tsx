/**
 * @jest-environment jsdom
 */
import React from "react";
import { cleanup, render, act } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  afterEach(cleanup);
  test("renders app correctly", async () => {
    expect.assertions(1);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const { baseElement } = render(<App />);
      expect(baseElement).toBeTruthy();
    });
  });
});
