import fs from "fs";

const filepath = "src/pages/TopPage.test.jsx";
const content = fs.readFileSync(filepath, "utf-8");

const lines = content.split("\n");

console.log("🔍 TopPage.test.jsx の内容（行番号付き）:");
lines.forEach((line, index) => {
  console.log(`${String(index + 1).padStart(3)} | ${line}`);
});
