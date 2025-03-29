import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ResultPage() {
  // 仮の提案内容（API連携前提）
  const result = {
    main: "鶏肉とキャベツのさっぱり煮",
    sides: ["ごはん", "冷やしトマト"],
    description:
      "鶏肉をゆでてポン酢でさっぱり仕上げたメイン料理。トマトやご飯と組み合わせてバランスよく。",
  };

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
            <Button>⭐ お気に入りに登録</Button>
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
