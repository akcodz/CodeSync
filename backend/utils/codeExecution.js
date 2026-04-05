export function getFileName(language) {
  const map = {
    javascript: "main.js",
    typescript: "main.ts",
    python: "main.py",
    cpp: "main.cpp",
    java: "Main.java",
    go: "main.go",
  };

  return map[language] || "main.txt";
}

export function normalizeResponse(data) {
  // batch execution support (future-ready)
  if (Array.isArray(data)) {
    return {
      success: true,
      output: data.map((res) => res.stdout).join("\n"),
    };
  }

  return {
    success: data.status === "success",
    output: data.stdout,
    error: data.stderr || data.error || data.exception,
    executionTime: data.executionTime,
    memory: data.memoryUsed,
  };
}

function handleError(error) {
  if (error.response) {
    return {
      success: false,
      error: error.response.data?.error || "Execution failed",
    };
  }

  return {
    success: false,
    error: "Server error while executing code",
  };
}