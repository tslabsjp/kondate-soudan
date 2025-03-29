import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  // ✅ 仮の履歴データ（後に localStorage に置き換え予定）
  const [history, setHistory] = useState([
    {
      id: 1,
      date: "2025/03/29",
      main: "豚の生姜焼き",
      sides: ["ごはん", "小松菜の和え物"],
      description: "ショウガの香りが食欲をそそる定番おかず。",
    },
    {
      id: 2,
      date: "2025/03/28",
      main: "麻婆豆腐",
      sides: ["ごはん", "中華サラダ"],
      description: "ピリ辛でごはんが進むやみつきメニュー。",
    },
  ]);

  const handleClear = () => {
    setHistory([]); // 🧹 全削除
  };

  const handleFavorite = (item) => {
    // ✅ ここでお気に入り追加処理を行う（localStorage連携可）
    console.log("お気に入り登録:", item);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">🍳 今日の献立相談室｜提案履歴</h1>
        <p className="text-sm text-gray-500">
          🕓 過去の献立提案履歴が確認できます
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {history.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs text-gray-500">🗓 {item.date}</p>
              <h2 className="text-lg font-semibold">🥘 {item.main}</h2>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {item.sides.map((side, idx) => (
                  <li key={idx}>🍽 {side}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-500">{item.description}</p>
              <Button size="sm" onClick={() => handleFavorite(item)}>
                ⭐ お気に入りに登録
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="destructive" onClick={handleClear}>
          🧹 履歴をすべて削除
        </Button>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500 space-x-4">
        <Link to="/">🏠 トップへ戻る</Link>
        <Link to="/input">📘 入力画面へ</Link>
        <Link to="/favorites">⭐ お気に入りを見る</Link>
      </footer>
    </div>
  );
}
