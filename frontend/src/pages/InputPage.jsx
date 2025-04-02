import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🆕 useNavigate を追加
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function InputPage() {
  const [ingredients, setIngredients] = useState("");
  const [mood, setMood] = useState("");

  const navigate = useNavigate(); // 🆕 遷移用の関数を取得

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/suggest`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients, mood }),
        }
      );

      const data = await response.json();

      // 結果を ResultPage に渡して遷移
      navigate("/result", {
        state: {
          ingredients,
          mood,
          result: data, // ← 提案データを含めて送る
        },
      });
    } catch (error) {
      console.error("献立提案エラー:", error);
      alert(
        "提案の取得に失敗しました。サーバーが起動しているか確認してください。"
      );
    }
  };

  const handleReset = () => {
    setIngredients("");
    setMood("");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">🍳 今日の献立相談室</h1>
        <p className="text-sm text-gray-500">
          〜 気分と食材から献立を提案します 〜
        </p>
      </header>

      <Card className="max-w-xl mx-auto shadow-md">
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ingredient" className="block font-semibold mb-1">
                🥬 食材
              </label>
              <Input
                id="ingredient"
                placeholder="例：鶏肉、キャベツ"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mood" className="block font-semibold mb-1">
                🌤 気分
              </label>
              <Input
                id="mood"
                placeholder="例：さっぱり、ガッツリ"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                🎯 献立を提案する
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                🔄 リセット
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <footer className="mt-10 text-center text-sm text-gray-500 space-x-4">
        <Button asChild variant="outline">
          <Link to="/">🏠 トップへ戻る</Link>
        </Button>
        <a href="#">📘 お気に入り</a>
        <a href="#">📜 履歴</a>
      </footer>
    </div>
  );
}
