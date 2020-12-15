import React, { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders app name link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.findByText("wts.ReactDefault");
  expect(linkElement).toBeDefined();
});




