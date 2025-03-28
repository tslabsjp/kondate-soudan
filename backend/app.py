from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource
import os
from dotenv import load_dotenv

# .env ファイルの読み込み
load_dotenv()

# Flask アプリの初期化
app = Flask(__name__)
CORS(app)

# 環境変数
APP_NAME = os.getenv("APP_NAME", "今日の献立相談室")
FLASK_ENV = os.getenv("FLASK_ENV", "production")

# Swagger UI の表示切り替え（開発環境のみ表示）
api = Api(
    app,
    version='1.0',
    title='献立相談室 API',
    description='食材×気分で献立を提案します',
    doc='/' if FLASK_ENV == "development" else False  # ← ここがポイント
)

# APIネームスペース
ns = api.namespace('api', description='献立関連')

# 通常のルート（UI不要でもアクセス可）
@app.route("/health")
def health_check():
    return {"status": "ok", "message": f"{APP_NAME} is running."}

# 献立提案API（GET）
@ns.route("/recipe")
class Recipe(Resource):
    def get(self):
        """サンプルレシピを返す"""
        return {
            "menu": "さっぱり鶏肉の南蛮漬け",
            "ingredients": ["鶏肉", "酢", "玉ねぎ", "ピーマン"]
        }

# アプリの起動
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
