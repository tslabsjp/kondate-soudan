import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  // ✅ 仮のお気に入りデータ（後でlocalStorage連携可能）
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      main: "鶏肉のさっぱり煮",
      sides: ["ごはん", "冷やしトマト"],
      description: "鶏肉を茹でてポン酢でさっぱり仕上げたメニューです。",
    },
    {
      id: 2,
      main: "ハンバーグプレート",
      sides: ["ごはん", "コールスロー"],
      description: "定番の家庭の味！みんな大好きハンバーグ。",
    },
  ]);

  // 🗑 削除処理（仮データ用）
  const handleDelete = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          🍳 今日の献立相談室｜お気に入り一覧
        </h1>
        <p className="text-sm text-gray-500">
          ⭐ お気に入りした献立を確認できます
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {favorites.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">🥘 {item.main}</h2>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {item.sides.map((side, idx) => (
                  <li key={idx}>🍽 {side}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-500">{item.description}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                🗑 削除
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="outline">📤 全件エクスポート</Button>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500 space-x-4">
        <Link to="/">🏠 トップへ戻る</Link>
        <Link to="/input">📘 入力画面へ</Link>
        <Link to="/history">📜 履歴を見る</Link>
      </footer>
    </div>
  );
}
