import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser
app.use(express.json());

// Lazy-initialized Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY 未正確設定。請設定環境變數 GEMINI_API_KEY，或於 .env 檔案中提供 API 金鑰。");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = `
你是一位專業的中文會議記錄秘書與翻譯專家。
請將使用者提供的「會議逐字稿」或「重點筆記」進行專業的整理，輸出格式必須為美觀易讀的 Markdown。

產出的會議記錄必須包含以下結構：
1. **會議主題與基本資訊** (若從文字中能推導則列出時間、地點、主席或參與者，否則寫「依據輸入內容分析」)
2. **會議核心總結** (簡單的三至五句關鍵摘要，提煉整場會議最核心的內容)
3. **重要決議與討論事項** (精煉的條列式項目說明，需清楚記錄討論過程與最終結論)
4. **待辦事項與指派對象** (清晰列出 Action Items、負責人與追蹤期限，若無，註明「無明確指派事項」)
5. **英文重點摘要翻譯** (將上述摘要與重點，翻譯成專業、精確的商務英文摘要，以便跨國團隊閱覽)

輸出規範：
- 請確保語氣專業、架構清晰明瞭。
- 必須全部使用繁體中文（除了英文翻譯部分）。
- 使用清晰的 Markdown 標題、粗體、條列式符號，增強排版美感與可讀性。
`;

// API routes FIRST
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "請輸入或貼上會議內容以進行分析。" });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: text,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      return res.status(500).json({ error: "AI 未能生成有效的會議記錄總結。請重試。" });
    }

    return res.json({ result: resultText });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({
      error: err.message || "處理請求時發生未知的伺服器錯誤。"
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
