import express from 'express';
import cors from 'cors';
import ollama from 'ollama';
import { marked } from 'marked';

const app = express();
const PORT = 3000;

app.use(cors()); // 啟用跨域請求
app.use(express.json()); // 處理 JSON 請求

app.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // 使用 llama3.2 進行聊天
    const response = await ollama.chat({
      model: 'llama3.2',
      messages: [{ role: 'user', content: question }],
    });
    const htmlContent = marked(response.message.content);
    return res.json({ answer: htmlContent });
  } catch (error) {
    console.error('Error communicating with llama3.2:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

