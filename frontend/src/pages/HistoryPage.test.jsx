import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./HistoryPage";

const mockHistory = [
  {
    id: 1,
    date: "2025/03/29",
    main: "豚の生姜焼き",
    sides: ["ごはん", "小松菜の和え物"],
    description: "ショウガの香りが食欲をそそる定番おかず。",
  },
];

beforeEach(() => {
  vi.spyOn(window, "fetch").mockResolvedValue({
    json: async () => mockHistory,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("HistoryPage", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={["/history"]}>
        <Routes>
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  // @id T401
  it("献立提案履歴が一覧表示される", async () => {
    renderWithRouter();

    expect(
      screen.getByRole("heading", { name: /提案履歴/ })
    ).toBeInTheDocument();
    expect(await screen.findByText(/豚の生姜焼き/)).toBeInTheDocument();
    expect(screen.getByText(/小松菜の和え物/)).toBeInTheDocument();
    expect(screen.getByText(/ショウガの香りが食欲/)).toBeInTheDocument();
  });

  // @id T403
  it("ナビゲーションリンクが表示されている", () => {
    renderWithRouter();

    expect(screen.getByRole("link", { name: /トップ/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /お気に入り/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /入力画面/i })).toBeInTheDocument();
  });
});
