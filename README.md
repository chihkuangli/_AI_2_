<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# AI 會議記錄與翻譯工具

這是一個使用 React + Vite + Express 的全端專案，透過 Google Gemini AI 將會議逐字稿生成結構化會議記錄與商務英文摘要。

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and set your Gemini API key:
   `GEMINI_API_KEY="YOUR_GEMINI_API_KEY"`
3. Run the app:
   `npm run dev`

## Deploy to Render

1. Create a new Node.js Web Service on Render.
2. Set the build command to:
   `npm install && npm run build`
3. Set the start command to:
   `npm start`
4. In Render dashboard, add the environment variable:
   `GEMINI_API_KEY`
5. Render will provide `PORT` automatically, and the app will use `process.env.PORT`.
