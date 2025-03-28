# kondate-soudan

ちゃちゃっと-献立相談

kondate-soudan/
├── backend/ # Flask バックエンド
│ ├── app.py # Flask アプリ本体（Swagger UI 付き）
│ ├── requirements.txt # Python 依存パッケージ定義
│ ├── Dockerfile.dev # 開発用 Dockerfile（flask run 使用）
│ ├── Dockerfile.prod # 本番用 Dockerfile
│ ├── .env # Flask 設定（APP_NAME, FLASK_ENV など）
│ ├── .env.example # 共有用テンプレート
│ ├── .gitignore # venv や **pycache** 除外
│ ├── .dockerignore # Docker ビルド除外設定
│ ├── venv/ # Python 仮想環境（gitignore 対象）
│ └── tests/
│ └── test_app.py # ユニットテスト（unittest）
│
├── frontend/ # React（Vite）フロントエンド
│ ├── src/
│ │ └── App.jsx # メイン UI（API と通信して表示）
│ ├── public/
│ ├── index.html # エントリーポイント
│ ├── vite.config.js # Vite 設定ファイル（任意：ポート変更など）
│ ├── package.json # npm 依存
│ ├── Dockerfile.dev # 開発用 Dockerfile（npm start）
│ ├── Dockerfile.prod # 本番用 Dockerfile（nginx 配信）
│ ├── .env # React から Flask へ接続する API URL（VITE_API_URL）
│ ├── .gitignore # Vite/Node 用（node_modules、dist など除外）
│ ├── .dockerignore # フロント用 Docker 除外設定
│
├── docker-compose.yml # フロント＋バック同時起動用（開発環境用）
├── .gitignore # プロジェクト共通の除外（.DS_Store など最低限）
└── README.md # 起動手順・開発ガイド
