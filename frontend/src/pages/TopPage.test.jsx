import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TopPage from "./TopPage";

describe("TopPage", () => {
  test("トップページを正しく描画できる", () => {
    render(
      <BrowserRouter>
        <TopPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/献立提案/i)).toBeInTheDocument();
  });
});
