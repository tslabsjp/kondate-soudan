import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import InputPage from "./InputPage";

describe("InputPage", () => {
  test("入力ページを正しく描画できる", () => {
    render(
      <BrowserRouter>
        <InputPage />
      </BrowserRouter>
    );
    expect(screen.getByRole("button", { name: /提案/i })).toBeInTheDocument();
  });
});
