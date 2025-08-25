import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// proxy endpoint
app.post("/api/generate", async (req, res) => {
  const { apiKey, prompt } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }]}]
        })
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
