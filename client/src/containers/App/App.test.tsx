import { screen, render } from "@testing-library/react";
import App from "./App";

test("renders product column", () => {
  render(<App />);
  const productColumn = screen.getByText(/Product name/i);
  expect(productColumn).toBeInTheDocument();
});
