import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import {
  FileText,
  Sparkles,
  Copy,
  Trash2,
  Check,
  AlertCircle,
  Clock,
  Briefcase,
  Stethoscope,
  Leaf,
  Globe,
  Plus
} from "lucide-react";

interface MeetingSample {
  id: string;
  title: string;
  icon: any;
  category: string;
  text: string;
}

const SAMPLE_MEETINGS: MeetingSample[] = [
  {
    id: "promo",
    title: "雙十一電商促銷與研發對齊",
    category: "電子商務",
    icon: Briefcase,
    text: `會議時間：2026年5月25日 上午 10:00 - 11:30
會議主題：Q3 電商平台雙十一檔期促銷策略與系統容量對齊
出席人員：David (PM), Sophia (Marketing Lead), Ken (QA Lead), Jerry (Backend Lead)

David: 各位好，今天主要是要討論我們今年第三季度電商平台針對雙十一的主要促銷玩法以及技術對齊。Sophia 妳那邊的行銷企劃成型了嗎？

Sophia: 是的，我們初步計畫今年主打「組團拼單，滿額免運」與「整點限時搶券」雙重機制。拼單需要至少三人成組，達到 1000 元可以享 8 折優惠，另外整點搶券最高折抵 500 元。

Jerry: 技術上「三人拼單」需要開闢新的資料庫欄位並修改結帳邏輯，預期需要 5 個工作天開發，3 個工作天進行壓力測試。整點限時搶券的話涉及超高併發（High Concurrency），快取 Redis 的設計要提前擴容。

Ken: QA 這邊，高併發的搶券活動需要進行至少兩輪性能與壓力測試。Ken 建議，我們最遲在 9 月底前要把搶券功能封裝送測，否則會跟後續的購物車重構時程衝突。

Sophia: 那行銷文案與 landing page 設計稿，我們設計師會在 8 月 15 日前提供給 Jerry。

David: 好的，那 Jerry 麻煩你在 8 月 20 日前先跑出一份 API 規格書給 Sophia 的外包網頁團隊。另外，Ken 提到的搶券送測時段，Jerry 請跟 Ken 共同討論後確定詳細的壓力測試排程。

Jerry: 沒問題，我下週二前提供 API 設計文件與時程表給各位。

David: 感謝大家，今天會議到此，散會。`
  },
  {
    id: "medical",
    title: "巡房智慧病歷系統開發對齊",
    category: "智慧醫療",
    icon: Stethoscope,
    text: `會議時間：2026年5月26日 下午 2:00
會議主題：醫護巡房智慧病歷系統平板端 Prototype 規格對齊
出席人員：Dr. Lin (醫療顧問), Ruby (Frontend Dev), Alex (System Architect)

Dr. Lin: 上次提到的病歷輸入介面，醫師在巡房時通常是用 iPad 平板電腦。按鈕一定要夠大，而且一定要支援語音直接辨識輸入，不然在查房時真的很難一邊走一邊打字，效率太低。

Ruby: 了解，前端部分我把平板模式（Tablet mode）的觸控區域放大 30%，最下方會常駐一個顯眼的「麥克風」按鈕。我會先使用瀏覽器原生的 Web Speech API 來做即時語音轉文字。不過原生的在部分離線狀態下可能不穩。

Alex: Web Speech API 的語音辨識率受走廊環境音影響很大。我們可以考慮對接一條雲端高精度 Whisper API 作為備用與強化機制，但會有額外的 Token 費用。我會先評估預算，下週跟副院長商量。

Dr. Lin: 另外，患者隱私安全是第一順位，所有病歷報告在儲存與傳遞時都要進行「去識別化（Anonymization）」，不應該直接顯示完整的身份證字號與生日在多數畫面上，除非有二次授權確認。

Alex: 這部分沒問題，後端在傳輸病歷資料時，身分證字號與生日欄位會先以 Hash 代碼處理並加上姓名遮罩，前端畫面會呈現 EX: A123***789。

Dr. Lin: 這樣很好。什麼時候可以給我們第一版 Prototype 測試？

Ruby: 前端介面下週五（6月5日）可以弄好，但要請 Alex 在下週三前生出一組 Mock API 讓我可以進行資料串接測試。

Alex: 沒問題，下週二前我就會把 Mock API 與 JSON schema 給妳，並且也會寫好資料去識別化的規格說明。

Dr. Lin: 很好，那我們兩週後（6月10日）再開會看第一個 Prototype 的實際操作效果。`
  },
  {
    id: "esg",
    title: "綠色辦公室 ESG 減碳策略會談",
    category: "企業永續",
    icon: Leaf,
    text: `會議時間：2026年5月27日 上午 11:00
會議主題：綠色辦公室 ESG 永續減碳計畫與階段指標訂定
出席人員：Emma (HR Lead), Sean (Operation GM), Cindy (PR Manager)

Emma: 我們公司今年預計要申請綠色辦公室認證，HR 這邊提倡全面停用一次性紙杯，改發印有公司 Logo 的環保隨行杯給全體員工與新進同仁，並推行無紙化數位公文簽核。

Sean: 我支持無紙化，但隨行杯的部分要算一下預算。如果是 200 個員工，每個杯子用不鏽鋼材質，預算大約要 40,000 元。另外行政組會把辦公大樓空調提早自下午 5 點半起逐步調至 27 度，並在晚上 8 點全面關閉冷氣。

Cindy: 晚上 8 點關閉冷氣，對於需要加班的工程師或客服代表會不會有反彈？

Sean: 這點我們有考慮，客服跟加班同仁可以集中到 5 樓的「夜間彈性辦公區」，那裡會保留獨立冷氣運作至晚上 11 點。

Cindy: PR 這裡預計可以把這些減碳數據整理，在 10 月的企業碳主權論壇中作為 ESG 進展發表。我需要 Emma 每季底提供紙張消耗量下降百分比，以及 Sean 提供辦公大樓電費降幅。

Emma: 沒問題，我會請 IT 把印表機系統加上計數追蹤，自動產生碳足跡報表。

Sean: 新冷氣與排程控制將於 6 月 1 日正式上線，我會在 7 月初提供第一個月的用電量對比報告給大家。

Emma: 感謝各位，今天的減碳共識很高，下文將會撰寫成公告發送給全公司。`
  }
];

export default function App() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [copied, setCopied] = useState(false);

  // Stats
  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const handleSelectSample = (sampleText: string) => {
    setInputText(sampleText);
    setErrorText("");
  };

  const handleClear = () => {
    setInputText("");
    setErrorText("");
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setErrorText("請輸入會議內容或選擇下方一個範例逐字稿。");
      return;
    }

    setIsLoading(true);
    setErrorText("");
    setResultText("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "伺服器發生異常錯誤");
      }

      setResultText(data.result);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "連線不穩定或 AI 處理失敗，請稍後重試。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("無法複製文字", err);
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Sleek Top Banner */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg shadow-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2.5 rounded-xl shadow-md shadow-slate-950 flex items-center justify-center text-slate-950">
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
                AI 會議記錄與翻譯工具
                <span className="hidden sm:inline-block text-xs font-normal text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
                  Gemini-Powered
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                一鍵提煉結構化會議記錄、追蹤待辦事項，並自動同步專業英文摘要
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1.5 rounded-md font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              UTC 2026
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Input + Samples */}
        <section className="flex-1 flex flex-col space-y-5" style={{ minWidth: 0 }}>
          
          {/* Editor Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col h-[520px]">
            {/* Header / Tabs */}
            <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-100">貼上會議逐字稿 / 筆記</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400 font-mono">
                  {charCount} 字元 | {wordCount} 單字
                </span>
                {inputText && (
                  <button
                    onClick={handleClear}
                    className="text-xs text-rose-300 hover:text-rose-100 font-medium flex items-center gap-1 transition-colors px-1.5 py-1 rounded hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3 h-3" />
                    清除全部
                  </button>
                )}
              </div>
            </div>

            {/* Textarea Input Area */}
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (errorText) setErrorText("");
                }}
                placeholder="請貼上您的會議對話記錄、逐字稿，或是雜亂的重點摘要筆記。
例如：
David: 下週五前要把設計稿生出來。
Sophia: 沒問題，我會催設計師。
...

本工具會自動整理成：會議基本資訊、核心總結、重要討論決議、結構化待辦事宜及專業商務英文摘要翻譯。"
                className="w-full h-full p-4 text-[14px] leading-relaxed text-slate-100 placeholder-slate-500 bg-slate-950 resize-none border-0 focus:ring-0 focus:outline-hidden"
              />
            </div>

            {/* Footer triggers */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                💡 支援直接貼上大型會議音訊轉文字檔（最高 100K 限制）
              </span>
              <button
                disabled={isLoading}
                onClick={handleGenerate}
                className={`relative w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 border shadow-xs transition-all duration-200 ${
                  isLoading
                    ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
                    : "bg-amber-500 border-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>智慧排版中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>生成總結與翻譯</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Samples Section */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span>點擊以下示範範本快速體驗工具</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SAMPLE_MEETINGS.map((sample) => {
                const IconComponent = sample.icon;
                const isSelected = inputText === sample.text;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample.text)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all group duration-200 relative overflow-hidden ${
                      isSelected
                        ? "border-amber-500 bg-slate-800 ring-1 ring-amber-500/20"
                        : "border-slate-700 bg-slate-950 hover:border-slate-600 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className={`p-1.5 rounded-lg ${
                        isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-medium bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full">
                        {sample.category}
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{sample.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {sample.id === "promo" && "Q3 行銷玩法對齊與負載壓力測試"}
                        {sample.id === "medical" && "平板巡房無障礙語音辨識與隱私去識別化"}
                        {sample.id === "esg" && "綠色辦公室節電防熱、隨行杯替代計畫"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Board */}
          <AnimatePresence>
            {errorText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-red-950 border border-red-700 p-4 rounded-xl flex items-start gap-2.5 text-red-100"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold block mb-0.5">處理失敗</span>
                  {errorText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Right Column: AI Output Results */}
        <section className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col h-full lg:min-h-[640px]">
            
            {/* Output Header */}
            <div className="bg-slate-950/80 border-b border-slate-800 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-slate-100">AI 結構化生成結果</span>
              </div>
              
              {resultText && (
                <button
                  onClick={handleCopy}
                  className="z-10 bg-slate-950 hover:bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-100 shadow-xs flex items-center gap-1.5 transition-all duration-150 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">已複製！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>複製結果結構</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Content Display Panel */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-950/70 relative">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="fetching"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="relative flex items-center justify-center mb-4">
                      {/* Concentric spinning animations */}
                      <span className="absolute inline-flex h-12 w-12 rounded-full bg-slate-800 animate-ping opacity-75"></span>
                      <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-700 border-t-amber-400"></div>
                      <Sparkles className="absolute w-4 h-4 text-amber-300" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">正在處理會議逐字稿</h4>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                      AI 正在分析段落、萃取討論重點、整理待辦事項並進行商務英譯。這通常需要 5 - 10 秒鐘...
                    </p>
                  </motion.div>
                ) : resultText ? (
                  <motion.div
                    key="display"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate max-w-none"
                  >
                    <div className="markdown-body">
                      <Markdown>{resultText}</Markdown>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center py-20 text-center text-slate-400"
                  >
                    <div className="bg-slate-800 p-4 rounded-full mb-4 text-slate-300">
                      <FileText className="w-10 h-10" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">暫無生成記錄</h4>
                    <p className="text-xs text-slate-400 mt-1.5 max-w-xs">
                      請在左側輸入或選擇範例會議內容，點點「生成總結與翻譯」按鈕，即可在這裡同步看到精準的 AI 報告。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Translation Guide / Badge panel */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-indigo-300" />
                繁體中文專業整理
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                商務英文重點翻譯對照
              </span>
              <span className="text-slate-600">|</span>
              <span>支援全平台極速複製</span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} AI 會議記錄與翻譯助理 • 本應用使用 Google Gemini 專業中文模型進行商務分析。
        </div>
      </footer>
    </div>
  );
}
