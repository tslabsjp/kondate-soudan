// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import InputPage from "./pages/InputPage.jsx"; // 入力画面
import ResultPage from "./pages/ResultPage.jsx"; // 結果画面
import FavoritesPage from "./pages/FavoritesPage.jsx"; // お気に入り一覧
import HistoryPage from "./pages/HistoryPage.jsx"; // 提案履歴
import NotFoundPage from "./pages/NotFoundPage.jsx"; // NotFound エラー画面
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* ← 404 catch-all */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
