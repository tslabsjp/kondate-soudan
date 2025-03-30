import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("お気に入り取得エラー:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${id}`, {
        method: "DELETE",
      });
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("削除失敗:", error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">📘 お気に入り一覧</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">
          登録されたお気に入りはありません。
        </p>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {favorites.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 space-y-2">
                <p className="font-semibold">🥘 {item.main}</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {item.sides.map((side, i) => (
                    <li key={i}>🍽 {side}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500">{item.description}</p>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑 削除
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <footer className="mt-10 text-center text-sm text-gray-500 space-x-4">
        <Link to="/">🏠 トップへ戻る</Link>
        <Link to="/input">📘 入力画面</Link>
        <Link to="/history">📜 履歴</Link>
      </footer>
    </div>
  );
}

// ✅ 仮のお気に入りデータ（後でlocalStorage連携可能） mock
// const [favorites, setFavorites] = useState([
//   {
//     id: 1,
//     main: "鶏肉のさっぱり煮",
//     sides: ["ごはん", "冷やしトマト"],
//     description: "鶏肉を茹でてポン酢でさっぱり仕上げたメニューです。",
//   },
//   {
//     id: 2,
//     main: "ハンバーグプレート",
//     sides: ["ごはん", "コールスロー"],
//     description: "定番の家庭の味！みんな大好きハンバーグ。",
//   },
// ]);
