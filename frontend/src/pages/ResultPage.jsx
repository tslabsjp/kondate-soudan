import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

export default function ResultPage() {
  // 仮の提案内容（API連携前提）mock
  // const result = {
  //   main: "鶏肉とキャベツのさっぱり煮",
  //   sides: ["ごはん", "冷やしトマト"],
  //   description:
  //     "鶏肉をゆでてポン酢でさっぱり仕上げたメイン料理。トマトやご飯と組み合わせてバランスよく。",
  // };

  // 🆕 InputPageから渡された state を取得
  const location = useLocation();
  const { result } = location.state || {};
  const hasSaved = useRef(false); // 🆕 初回登録フラグ
  const [favorites, setFavorites] = useState([]);

  // 履歴登録
  useEffect(() => {
    if (!result || hasSaved.current) return;

    const saveHistory = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });
        console.log("履歴登録成功");
        hasSaved.current = true;
      } catch (err) {
        console.error("履歴登録エラー:", err);
      }
    };

    saveHistory();
  }, [result]);

  // お気に入り一覧取得
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("お気に入り取得エラー:", err));
  }, []);

  // 重複チェック関数
  const isDuplicate = () => {
    return favorites.some(
      (item) =>
        item.main === result.main &&
        JSON.stringify(item.sides) === JSON.stringify(result.sides) &&
        item.description === result.description
    );
  };

  // お気に入り登録処理
  const handleAddFavorite = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        }
      );

      const data = await response.json();
      console.log("お気に入り登録成功:", data);
      alert("✅ お気に入りに登録しました！");
      setFavorites((prev) => [...prev, result]);
    } catch (error) {
      console.error("お気に入り登録失敗:", error);
      alert("❌ 登録に失敗しました。");
    }
  };

  // 🆕 結果がない場合のエラーハンドリング
  if (!result) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">😢 提案結果がありません</h1>
        <p className="mb-6">入力画面からもう一度お試しください。</p>
        <Button asChild>
          <Link to="/input">📘 入力画面へ</Link>
        </Button>
      </div>
    );
  }

  // 通常表示
  return (
    <div className="min-h-screen bg-orange-50 p-6 text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">🍳 今日の献立相談室｜提案結果</h1>
      </header>

      <Card className="max-w-xl mx-auto shadow-md">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">🎯 ご提案</h2>
            <p className="text-lg font-bold">🥘 {result.main}</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {result.sides.map((item, idx) => (
                <li key={idx}>🍽 {item}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-600">{result.description}</p>

          <div className="flex gap-4">
            <Button onClick={handleAddFavorite} disabled={isDuplicate()}>
              {isDuplicate() ? "⭐ 登録済み" : "⭐ お気に入りに登録"}
            </Button>
            <Button variant="outline">🔄 もう一度提案</Button>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-10 text-center text-sm text-gray-500 space-x-4">
        <Link to="/">🏠 トップへ戻る</Link>
        <Link to="/favorites">📘 お気に入り</Link>
        <Link to="/history">📜 履歴</Link>
      </footer>
    </div>
  );
}
