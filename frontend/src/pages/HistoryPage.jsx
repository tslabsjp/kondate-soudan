import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  // ✅ 仮の履歴データ（後に localStorage に置き換え予定） mock
  // const [history, setHistory] = useState([
  //   {
  //     id: 1,
  //     date: "2025/03/29",
  //     main: "豚の生姜焼き",
  //     sides: ["ごはん", "小松菜の和え物"],
  //     description: "ショウガの香りが食欲をそそる定番おかず。",
  //   },
  //   {
  //     id: 2,
  //     date: "2025/03/28",
  //     main: "麻婆豆腐",
  //     sides: ["ごはん", "中華サラダ"],
  //     description: "ピリ辛でごはんが進むやみつきメニュー。",
  //   },
  // ]);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("履歴取得エラー:", err));
  }, []);

  const handleClearHistory = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/history`, {
        method: "DELETE",
      });
      setHistory([]);
      alert("🧹 履歴を削除しました！");
    } catch (error) {
      console.error("履歴削除失敗:", error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">📜 提案履歴</h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-600">履歴はまだありません。</p>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {history.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 space-y-2">
                <p className="text-sm text-gray-500">🗓️ {item.date}</p>
                <p className="font-semibold">🥘 {item.main}</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {item.sides.map((side, i) => (
                    <li key={i}>🍽 {side}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Button variant="destructive" onClick={handleClearHistory}>
          🧹 履歴をすべて削除
        </Button>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500 space-x-4">
        <Link to="/">🏠 トップへ戻る</Link>
        <Link to="/input">📘 入力画面</Link>
        <Link to="/favorites">⭐ お気に入り</Link>
      </footer>
    </div>
  );
}
