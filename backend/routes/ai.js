const express = require('express');
const router = express.Router();
const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

router.post('/chat', async (req, res) => {
  const { message, model } = req.body;
  if (!message) return res.status(400).send("Missing message");

  try {
  const response = await axios.post(`${GROQ_BASE_URL}/chat/completions`, {
    model: model || "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: message }],
    temperature: 0.7,
    max_tokens: 10
  }, {
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("Groq LLM ERROR:", err.response?.data || err.message);
    res.status(500).send("Groq AI error");
  }
});

module.exports = router;
