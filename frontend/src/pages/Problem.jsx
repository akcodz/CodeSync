import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import axios from "axios";
import { useResizable } from "react-resizable-layout";
import ProblemDescription from "../components/ProblemDescription.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import CodeEditorPanel from "../components/CodeEditorPanel.jsx";
import { UserContext } from "../context/UserContext";

function Problem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript,
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  // 🔹 RESIZABLE PANELS
  const horizontal = useResizable({
    axis: "x",
    initial: 40,
    min: 25,
    max: 75,
  });

  const vertical = useResizable({
    axis: "y",
    initial: 70,
    min: 30,
    max: 80,
  });

  // 🔹 Update problem
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);

  // 🔥 EXECUTION HANDLER (FIXED)
  const handleCodeExecution = async () => {
    if (!code.trim()) {
      setOutput("Write some code first.");
      return;
    }

    setIsRunning(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/projects/run-code`,
        {
          code,
          language: selectedLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOutput(res.data || "No output");
    } catch (err) {
      setOutput(err.response?.data?.error || "Execution failed.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-[#121212] text-zinc-200 flex">
      {/* LEFT PANEL */}
      <div
        style={{ width: `${horizontal.position}%` }}
        className="border-r border-zinc-800 overflow-auto"
      >
        <ProblemDescription
          problem={currentProblem}
          currentProblemId={currentProblemId}
          onProblemChange={handleProblemChange}
          allProblems={Object.values(PROBLEMS)}
        />
      </div>

      {/* RESIZE HANDLE (VERTICAL) */}
      <div
        {...horizontal.separatorProps}
        className="w-1 bg-zinc-800 hover:bg-zinc-600 cursor-col-resize"
      />

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col">
        {/* CODE EDITOR */}
        <div
          style={{ height: `${vertical.position}%` }}
          className="border-b border-zinc-800 overflow-hidden"
        >
          <CodeEditorPanel
            selectedLanguage={selectedLanguage}
            code={code}
            isRunning={isRunning}
            onLanguageChange={handleLanguageChange}
            onCodeChange={setCode}
            onRunCode={handleCodeExecution}
          />
        </div>

        {/* RESIZE HANDLE (HORIZONTAL) */}
        <div
          {...vertical.separatorProps}
          className="h-1 bg-zinc-800 hover:bg-zinc-600 cursor-row-resize"
        />

        {/* OUTPUT PANEL */}
        <div className="flex-1 overflow-auto">
          <OutputPanel
            output={output}
            expectedOutput={currentProblem.expectedOutput[selectedLanguage]}
          />
        </div>
      </div>
    </div>
  );
}

export default Problem;
