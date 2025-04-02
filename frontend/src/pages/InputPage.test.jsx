import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import InputPage from "./InputPage";
import ResultPage from "./ResultPage"; // ✅ 本物のResultPageを使う

describe("InputPage", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={["/input"]}>
        <Routes>
          <Route path="/input" element={<InputPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  // @id T101
  // @screen InputPage
  // @desc 初期状態で食材・気分の入力欄が表示される
  // @check プレースホルダーや初期値が正しく表示される
  // @auto ○
  it("初期状態で入力欄が表示される", () => {
    renderWithRouter();
    // expect(screen.getByPlaceholderText(/食材/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/気分/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/食材/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/気分/i)).toBeInTheDocument();
  });

  // @id T102
  // @screen InputPage
  // @desc 入力後に「献立を提案する」ボタンを押すと結果画面に遷移
  // @check テキスト入力 → ボタンクリック → 遷移
  // @auto ○
  it("食材と気分を入力して提案ボタンで遷移する", async () => {
    renderWithRouter();

    // await userEvent.type(screen.getByPlaceholderText(/食材/i), "鶏肉");
    // await userEvent.type(screen.getByPlaceholderText(/気分/i), "さっぱり");
    await userEvent.type(screen.getByLabelText(/食材/i), "鶏肉");
    await userEvent.type(screen.getByLabelText(/気分/i), "さっぱり");
    await userEvent.click(
      screen.getByRole("button", { name: /献立を提案する/i })
    );

    expect(await screen.findByText(/ご提案/)).toBeInTheDocument();
  });
});
