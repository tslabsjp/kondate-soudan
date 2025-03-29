import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ← shadcn版
import { Card, CardContent } from "@/components/ui/card"; // card も shadcn版に

export default function TopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 text-gray-800 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">🍳 今日の献立相談室</h1>
        <p className="text-lg text-gray-600">
          共働き・子育て家庭のためのかんたん献立提案アプリ
        </p>
      </header>

      <main className="flex flex-col items-center space-y-6">
        {/* メインボタン */}
        <Button asChild className="text-xl px-8 py-4 rounded-2xl shadow-md">
          <Link to="/input">🍱 献立を相談する</Link>
        </Button>

        {/* リンクボタン群 */}
        <div className="flex gap-4">
          <Button variant="outline">
            <Link to="/favorites">🔸 お気に入りを見る</Link>
          </Button>
          <Button variant="outline">
            <Link to="/favorites">🔸 提案履歴を見る</Link>
          </Button>
        </div>

        {/* カードで特徴紹介 */}
        <Card className="max-w-xl mt-8">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">📄 このアプリについて</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>気分と食材から献立を提案</li>
              <li>履歴保存＆お気に入り機能あり</li>
              <li>3日で作ったシンプルなWebアプリ</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 space-x-4">
        <a href="#">📫 お問い合わせ</a>
        <a href="#">GitHub</a>
        <a href="#">利用規約</a>
      </footer>
    </div>
  );
}
