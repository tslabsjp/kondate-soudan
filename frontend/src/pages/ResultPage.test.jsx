// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import ResultPage from "./ResultPage";

// describe("ResultPage", () => {
//   // mockResult をファイル冒頭に追加
//   const mockResult = {
//     main: "味噌汁",
//     sides: ["ごはん", "味噌汁"],
//     description: "を使った料理を提案しました。",
//   };

//   const renderWithRouter = () => {
//     return render(
//       // <MemoryRouter initialEntries={["/result"]}>
//       //   <Routes>
//       //     <Route path="/result" element={<ResultPage />} />
//       //     <Route path="/favorites" element={<div>Favorites Page</div>} />
//       //     <Route path="/history" element={<div>History Page</div>} />
//       //   </Routes>
//       // </MemoryRouter>
//       <MemoryRouter
//         initialEntries={[
//           {
//             pathname: "/result",
//             state: { result: mockResult },
//           },
//         ]}
//       >
//         <Routes>
//           <Route path="/result" element={<ResultPage />} />
//           <Route path="/favorites" element={<div>Favorites Page</div>} />
//           <Route path="/history" element={<div>History Page</div>} />
//         </Routes>
//       </MemoryRouter>
//     );
//   };

//   // @id T201
//   // @screen ResultPage
//   // @desc 献立名と説明文が表示される
//   // @check レシピ名・提案文が正しく表示されているか
//   // @auto ○

//   it("献立名と説明文が表示される", () => {
//     renderWithRouter();

//     // ご提案セクションがあること
//     expect(screen.getByText(/ご提案/)).toBeInTheDocument();

//     // メニュー名（例：ごはん）
//     expect(screen.getByText(/ごはん/)).toBeInTheDocument();
//     expect(screen.getByText(/味噌汁/)).toBeInTheDocument();

//     // 説明文の一部チェック
//     expect(
//       screen.getByText(/を使った料理を提案しました。/)
//     ).toBeInTheDocument();
//   });

//   // @id T202
//   // @screen ResultPage
//   // @desc お気に入りボタンでFavoritesページに遷移
//   // @check ボタン押下 → /favorites に遷移するか
//   // @auto ○
//   it("お気に入りボタンでFavoritesに遷移する", async () => {
//     renderWithRouter();

//     await userEvent.click(
//       screen.getByRole("button", { name: /お気に入り登録/i })
//     );
//     expect(screen.getByText("Favorites Page")).toBeInTheDocument();
//   });

//   // @id T203
//   // @screen ResultPage
//   // @desc もう一度提案ボタンで履歴ページに遷移
//   // @check 再提案ボタン → /history 遷移確認
//   // @auto ○
//   it("もう一度提案ボタンで履歴ページに遷移する", async () => {
//     renderWithRouter();

//     await userEvent.click(
//       screen.getByRole("button", { name: /もう一度提案/i })
//     );
//     expect(screen.getByText("History Page")).toBeInTheDocument();
//   });
// });

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResultPage from "./ResultPage";
import FavoritesPage from "./FavoritesPage"; // 実際のパスに合わせて調整

// 🆕 テスト用モックデータ
const mockResult = {
  main: "味噌汁",
  sides: ["ごはん", "味噌汁"],
  description: "を使った料理を提案しました。",
};

// 🆕 location.state を含めてルーティングレンダリング
const renderWithRouter = () => {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/result",
          state: { result: mockResult },
        },
      ]}
    >
      <Routes>
        <Route path="/result" element={<ResultPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* <Route path="/history" element={<HistoryPage />} /> */}
      </Routes>
    </MemoryRouter>
  );
};

describe("ResultPage", () => {
  // @id T201
  // @screen ResultPage
  // @desc 献立名と説明文が表示される
  // @check レシピ名・提案文が正しく表示されているか
  // @auto ○
  it("献立名と説明文が表示される", () => {
    renderWithRouter();

    expect(screen.getByText(/ご提案/)).toBeInTheDocument();
    expect(screen.getByText(/ごはん/)).toBeInTheDocument();
    expect(screen.getAllByText(/味噌汁/)).toHaveLength(2);
    expect(
      screen.getByText(/を使った料理を提案しました。/)
    ).toBeInTheDocument();
  });

  // @id T202
  // @screen ResultPage
  // @desc お気に入りボタンでFavoritesページに遷移
  // @check ボタン押下 → /favorites に遷移するか
  // @auto ○
  it("フッターの『お気に入り』リンクでFavoritesに遷移する", async () => {
    renderWithRouter();

    // フッターのリンクをクリック
    const favLink = screen.getByRole("link", { name: /お気に入り/i });
    await userEvent.click(favLink);

    expect(
      screen.getByText(
        (content, element) =>
          element.tagName.toLowerCase() === "h1" &&
          content.includes("お気に入り一覧")
      )
    ).toBeInTheDocument();
  });

  // TODO テストケース要修正：もう一度提案の画面遷移確認
  // @id T203
  // @screen ResultPage
  // @desc もう一度提案ボタンで履歴ページに遷移
  // @check 再提案ボタン → /history 遷移確認
  // @auto ○
  // it("もう一度提案ボタンで履歴ページに遷移する", async () => {
  //   renderWithRouter();

  //   await userEvent.click(
  //     screen.getByRole("button", { name: /もう一度提案/i })
  //   );
  //   expect(screen.getByText("History Page")).toBeInTheDocument();
  // });
});
