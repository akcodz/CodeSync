import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  const currentLang = LANGUAGE_CONFIG[selectedLanguage];

  return (
    <div className="h-full flex flex-col bg-[#121212] text-zinc-200">

      {/* 🔹 HEADER / TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#121212]">

        {/* LEFT: Language Selector */}
        <div className="flex items-center gap-3">

          {/* ICON */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#181818] border border-zinc-800">
            <img
              src={currentLang.icon}
              alt={currentLang.name}
              className="size-4"
            />
            <span className="text-sm text-zinc-300">
              {currentLang.name}
            </span>
          </div>

          {/* SELECT */}
          <select
            value={selectedLanguage}
            onChange={onLanguageChange}
            className="px-2 py-1 text-sm rounded-md bg-[#181818] 
            border border-zinc-800 text-zinc-300
            focus:outline-none focus:border-zinc-600"
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* RIGHT: RUN BUTTON */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md font-medium transition
          ${
            isRunning
              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              : "bg-zinc-100 text-[#121212] hover:bg-zinc-200"
          }`}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run
            </>
          )}
        </button>
      </div>

      {/* 🔹 EDITOR */}
      <div className="flex-1 overflow-hidden">

        <Editor
          height="100%"
          language={currentLang.monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "Fira Code, monospace",
            lineHeight: 22,

            padding: { top: 12, bottom: 12 },

            scrollBeyondLastLine: false,
            automaticLayout: true,

            minimap: { enabled: false },
            smoothScrolling: true,

            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",

            renderLineHighlight: "all",
            lineNumbers: "on",

            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;