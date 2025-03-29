import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">🚫 404 Not Found</h1>
      <p className="text-lg text-center mb-8">
        お探しのページは存在しないか、URLが間違っている可能性があります。
      </p>

      <Button asChild className="mb-6">
        <Link to="/">🏠 トップページに戻る</Link>
      </Button>

      <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 underline">
        <Link to="/input">📘 入力画面へ</Link>
        <Link to="/history">📜 履歴を見る</Link>
        <Link to="/favorites">⭐ お気に入りを見る</Link>
      </div>
    </div>
  );
}
