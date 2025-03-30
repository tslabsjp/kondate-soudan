import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HistoryPage from "./HistoryPage";

describe("HistoryPage", () => {
  test("履歴ページを正しく描画できる", () => {
    render(
      <BrowserRouter>
        <HistoryPage />
      </BrowserRouter>
    );
    // 限定テキストに修正
    expect(screen.getByText("📜 提案履歴")).toBeInTheDocument();
    expect(screen.getByText("履歴はまだありません。")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /履歴をすべて削除/i })
    ).toBeInTheDocument();
  });
});
