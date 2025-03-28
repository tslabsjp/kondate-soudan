import { useEffect, useState } from "react";

function App() {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🍳 今日の献立提案</h1>
      {recipe ? (
        <div>
          <h2>📌 メニュー: {recipe.menu}</h2>
          <ul>
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>🧂 {item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}

export default App;
