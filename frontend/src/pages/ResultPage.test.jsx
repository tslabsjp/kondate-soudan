import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResultPage from "./ResultPage";

describe("ResultPage", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={["/result"]}>
        <Routes>
          <Route path="/result" element={<ResultPage />} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />
          <Route path="/history" element={<div>History Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  // @id T201
  // @screen ResultPage
  // @desc 献立名と説明文が表示される
  // @check レシピ名・提案文が正しく表示されているか
  // @auto ○
  it("献立名と説明文が表示される", () => {
    renderWithRouter();

    expect(screen.getByText(/メイン料理/i)).toBeInTheDocument();
    expect(screen.getByText(/提案理由/i)).toBeInTheDocument();
  });

  // @id T202
  // @screen ResultPage
  // @desc お気に入りボタンでFavoritesページに遷移
  // @check ボタン押下 → /favorites に遷移するか
  // @auto ○
  it("お気に入りボタンでFavoritesに遷移する", async () => {
    renderWithRouter();

    await userEvent.click(
      screen.getByRole("button", { name: /お気に入り登録/i })
    );
    expect(screen.getByText("Favorites Page")).toBeInTheDocument();
  });

  // @id T203
  // @screen ResultPage
  // @desc もう一度提案ボタンで履歴ページに遷移
  // @check 再提案ボタン → /history 遷移確認
  // @auto ○
  it("もう一度提案ボタンで履歴ページに遷移する", async () => {
    renderWithRouter();

    await userEvent.click(
      screen.getByRole("button", { name: /もう一度提案/i })
    );
    expect(screen.getByText("History Page")).toBeInTheDocument();
  });
});
