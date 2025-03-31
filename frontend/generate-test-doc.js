const fs = require("fs");
const path = require("path");
const glob = require("glob");

const testFiles = glob.sync("src/pages/*.test.jsx");

const header = [
  "テストID",
  "画面名",
  "テスト内容",
  "確認観点",
  "自動化",
  "ファイル名",
  "ステータス",
  "担当者",
  "実施日",
  "コメント",
];

const rows = [];

for (const filepath of testFiles) {
  const content = fs.readFileSync(filepath, "utf-8");
  const lines = content.split("\n");
  let current = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("// @id")) {
      current = { file: path.basename(filepath) };
      current.id = line.replace("// @id", "").trim();
    } else if (line.startsWith("// @screen")) {
      current.screen = line.replace("// @screen", "").trim();
    } else if (line.startsWith("// @desc")) {
      current.desc = line.replace("// @desc", "").trim();
    } else if (line.startsWith("// @check")) {
      current.check = line.replace("// @check", "").trim();
    } else if (line.startsWith("// @auto")) {
      current.auto = line.replace("// @auto", "").trim();
    } else if (line.match(/^it\s*\(/)) {
      if (
        current.id &&
        current.screen &&
        current.desc &&
        current.check &&
        current.auto
      ) {
        // Notion用のカラムを追加
        rows.push({
          ...current,
          status: "未着手",
          assignee: "",
          date: "",
          comment: "",
        });
        current = {};
      }
    }
  }
}

// ソート（ID昇順）
rows.sort((a, b) => {
  const aNum = parseInt(a.id.replace(/[^\d]/g, ""));
  const bNum = parseInt(b.id.replace(/[^\d]/g, ""));
  return aNum - bNum;
});

// CSV出力
const csvLines = [
  header.join(","),
  ...rows.map((row) =>
    [
      row.id,
      row.screen,
      row.desc,
      row.check,
      row.auto,
      row.file,
      row.status,
      row.assignee,
      row.date,
      row.comment,
    ].join(",")
  ),
];

fs.writeFileSync("test-specs-notion.csv", csvLines.join("\n"), "utf-8");
console.log(`✅ Notion用CSV（test-specs-notion.csv）を出力しました！`);
