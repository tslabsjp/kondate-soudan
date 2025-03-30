import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FavoritesPage from "./FavoritesPage";

describe("FavoritesPage", () => {
  test("お気に入り一覧ページを正しく描画できる", () => {
    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );
    // 限定テキストに修正
    expect(screen.getByText("📘 お気に入り一覧")).toBeInTheDocument();
    expect(
      screen.getByText("登録されたお気に入りはありません。")
    ).toBeInTheDocument();
  });
});
