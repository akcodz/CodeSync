import { CheckCircle, XCircle, Clock, Cpu } from "lucide-react";

function OutputPanel({ output, expectedOutput }) {
  const isEmpty = !output;

  // 🔹 Normalize Output
  const normalize = (str) => {
    if (!str) return "";
    return str
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter(Boolean)
      .join("\n");
  };

  const isCorrect =
    !isEmpty &&
    expectedOutput &&
    normalize(output.output) === normalize(expectedOutput);

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f] text-zinc-200">

      {/* 🔹 HEADER */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-300">Output</h2>

        {!isEmpty && (
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{output.executionTime} ms</span>
            </div>
            <div className="flex items-center gap-1">
              <Cpu size={14} />
              <span>{Math.round(output.memory / 1024)} KB</span>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 VERDICT BAR */}
      {!isEmpty && expectedOutput && (
        <div
          className={`flex items-center justify-between px-4 py-2 border-b text-sm ${
            isCorrect
              ? "bg-green-500/10 border-green-500/20"
              : "bg-red-500/10 border-red-500/20"
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {isCorrect ? (
              <CheckCircle size={16} className="text-green-400" />
            ) : (
              <XCircle size={16} className="text-red-400" />
            )}
            <span className={isCorrect ? "text-green-400" : "text-red-400"}>
              {isCorrect ? "Accepted" : "Wrong Answer"}
            </span>
          </div>

          <span className="text-xs text-zinc-400">
            {isCorrect
              ? "All test cases passed"
              : "Output does not match expected"}
          </span>
        </div>
      )}

      {/* 🔹 CONTENT */}
      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* EMPTY STATE */}
        {isEmpty && (
          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">
            <p className="text-sm">No output yet</p>
            <p className="text-xs mt-1">Run your code to see results</p>
          </div>
        )}

        {/* OUTPUT BLOCKS */}
        {!isEmpty && (
          <>
            {/* YOUR OUTPUT */}
            <OutputBlock
              title="Your Output"
              value={output.output || "No output"}
              highlight={!isCorrect && expectedOutput}
            />

            {/* EXPECTED OUTPUT */}
            {expectedOutput && (
              <OutputBlock
                title="Expected Output"
                value={expectedOutput}
                muted
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* 🔹 Reusable Block */
function OutputBlock({ title, value, highlight = false, muted = false }) {
  return (
    <div>
      <p className="text-xs text-zinc-500 mb-1">{title}</p>

      <pre
        className={`text-sm font-mono whitespace-pre-wrap rounded-lg p-3 border
        ${
          highlight
            ? "bg-red-500/5 border-red-500/30 text-red-300"
            : muted
            ? "bg-[#151515] border-zinc-800 text-zinc-400"
            : "bg-[#181818] border-zinc-800 text-zinc-200"
        }`}
      >
        {value}
      </pre>
    </div>
  );
}

export default OutputPanel;