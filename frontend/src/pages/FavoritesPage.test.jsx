import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FavoritesPage from "./FavoritesPage";

describe("FavoritesPage", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={["/favorites"]}>
        <Routes>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  // @id T301
  // @screen FavoritesPage
  // @desc お気に入りに登録した献立が表示される
  // @check 献立カードの表示（料理名・内容）
  // @auto ○
  it("お気に入り献立がカードで表示される", () => {
    renderWithRouter();

    expect(screen.getByText(/お気に入り献立/i)).toBeInTheDocument();
    // TODO: モックされたお気に入りがある前提で確認したい場合は以下追加
    // expect(screen.getByText(/チキンソテー/i)).toBeInTheDocument();
  });

  // @id T302
  // @screen FavoritesPage
  // @desc 各カードに削除ボタンがあり、削除可能
  // @check 削除ボタン押下 → 対象カード非表示になるか
  // @auto ○
  it("お気に入り削除ボタンが動作する", async () => {
    renderWithRouter();

    const deleteButton = screen.getByRole("button", { name: /削除/i });
    await userEvent.click(deleteButton);

    // TODO: カードが非表示になるか確認（要:モック or 初期状態）
    // expect(screen.queryByText(/チキンソテー/i)).not.toBeInTheDocument();
  });

  // @id T303
  // @screen FavoritesPage
  // @desc 画面内にナビゲーションリンクが表示されている
  // @check トップ／入力／履歴へのリンク表示
  // @auto ○
  it("ナビゲーションリンクが表示されている", () => {
    renderWithRouter();

    expect(screen.getByRole("link", { name: /トップ/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /献立を相談/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /履歴/i })).toBeInTheDocument();
  });
});
