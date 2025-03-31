import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./HistoryPage";

describe("HistoryPage", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={["/history"]}>
        <Routes>
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/result" element={<div>Result Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  // @id T401
  // @screen HistoryPage
  // @desc 過去の献立提案履歴が一覧で表示される
  // @check 提案履歴がリスト or カードで正しく表示されている
  // @auto ○
  it("献立提案履歴が一覧表示される", () => {
    renderWithRouter();

    expect(screen.getByText(/過去の提案/i)).toBeInTheDocument();
    // TODO: モックデータの料理名などが表示されているかも確認可能
    // expect(screen.getByText(/鶏肉の照り焼き/i)).toBeInTheDocument();
  });

  // @id T402
  // @screen HistoryPage
  // @desc 「もう一度提案」ボタンで再提案画面に遷移
  // @check ボタンクリック → Resultページ遷移
  // @auto ○
  it("もう一度提案ボタンで結果画面に遷移する", async () => {
    renderWithRouter();

    await userEvent.click(
      screen.getByRole("button", { name: /もう一度提案/i })
    );
    expect(screen.getByText("Result Page")).toBeInTheDocument();
  });

  // @id T403
  // @screen HistoryPage
  // @desc ナビゲーションリンクが正しく表示されている
  // @check トップ／お気に入り／入力画面へのリンクがあるか
  // @auto ○
  it("ナビゲーションリンクが表示されている", () => {
    renderWithRouter();

    expect(screen.getByRole("link", { name: /トップ/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /お気に入り/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /献立を相談/i })
    ).toBeInTheDocument();
  });
});
