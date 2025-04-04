import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";

function CodeReview() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true); 
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen w-full p-8 flex-col  flex gap-6 bg-[#121212] text-gray-200">
      {/* Code Editor Section */}
      <div className="flex-1 bg-gray-950 border border-gray-600 rounded-lg p-4 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-300 font-heading">Code Editor</h2>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={12}
          style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: 14,
            height: "88%",
            backgroundColor: "#1e1e1e",
            borderRadius: "8px",
            color: "#f8f8f2",
            overflow: "auto",
          }}
        />
        <button
          onClick={reviewCode}
          className="text-lg px-3 py-1 mt-4 text-gray-300 rounded-lg bg-[#121212] border-2 border-gray-100 hover:bg-gray-100 hover:text-[#121212] transition-all duration-500 ease-in-out font-medium"
        >
          Review Code
        </button>
      </div>

      {/* Review Section */}
      <div className="flex-1 bg-gray-950 border border-gray-600 rounded-lg p-4 shadow-lg overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-500 font-heading">AI Review Output</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review || "No review yet. Submit code to get feedback."}
          </Markdown>
        )}
      </div>
    </main>
  );
}

export default CodeReview;
