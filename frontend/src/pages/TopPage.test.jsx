import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TopPage from "./TopPage";

describe("TopPage", () => {
  const renderWithRouter = (initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/input" element={<div>Input Page</div>} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />
          <Route path="/history" element={<div>History Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  // @id T001
  // @screen TopPage
  // @desc トップページの要素が表示される
  // @check ボタン／リンク表示、アプリ紹介文の存在
  // @auto ○
  it("トップページの要素が表示される", () => {
    renderWithRouter();

    expect(screen.getByText(/今日の献立相談室/i)).toBeInTheDocument();
    expect(screen.getByText(/共働き・子育て家庭のための/i)).toBeInTheDocument();

    expect(screen.getByText(/献立を相談する/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /お気に入りを見る/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /提案履歴を見る/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/このアプリについて/i)).toBeInTheDocument();
  });

  // @id T002
  // @screen TopPage
  // @desc 「献立を相談する」クリックで入力画面に遷移
  // @check ボタンクリック → 画面遷移（/input）
  // @auto ○
  it("「献立を相談する」クリックで入力画面に遷移する", async () => {
    renderWithRouter();
    await userEvent.click(screen.getByText(/献立を相談する/i));
    expect(screen.getByText("Input Page")).toBeInTheDocument();
  });

  // @id T003
  // @screen TopPage
  // @desc 「お気に入りを見る」リンクでFavoritesページに遷移
  // @check リンククリック → /favorites 遷移確認
  // @auto ○
  it("「お気に入りを見る」リンクでFavoritesページに遷移する", async () => {
    renderWithRouter();
    await userEvent.click(
      screen.getByRole("link", { name: /お気に入りを見る/i })
    );
    expect(screen.getByText("Favorites Page")).toBeInTheDocument();
  });

  // @id T004
  // @screen TopPage
  // @desc 「提案履歴を見る」リンクでHistoryページに遷移
  // @check リンククリック → /history 遷移確認
  // @auto ○
  it("「提案履歴を見る」リンクでHistoryページに遷移する", async () => {
    renderWithRouter();
    await userEvent.click(
      screen.getByRole("link", { name: /提案履歴を見る/i })
    );
    expect(screen.getByText("History Page")).toBeInTheDocument();
  });
});
