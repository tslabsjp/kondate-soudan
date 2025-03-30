import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ResultPage from "./ResultPage";

describe("ResultPage", () => {
  test("提案結果ページを正しく描画できる", () => {
    render(
      <BrowserRouter>
        <ResultPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/提案結果/i)).toBeInTheDocument();
  });
});
