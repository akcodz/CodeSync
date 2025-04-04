import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import CodeEditor from "../components/CodeEditor";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BiSolidRightArrow } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  const [code, setCode] = useState(""); 
  const [output, setOutput] = useState(""); 
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useContext(UserContext);
  const { project } = location.state;
  const PROJECT_ID = project._id;
  const language = project.language;
  const PUBLIC_API_KEY = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_API_KEY;

  const handleCodeExecution = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false); // End loading
        return;
      }
      console.log("Code", code);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/projects/run-code`,
        { code, language }, // Send code from state
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response", response);
      setOutput(response.data.output || "No output"); // Update output
    } catch (error) {
      setOutput(error.response?.data?.error || "Error running code.");
      console.error(
        "Error running code:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <LiveblocksProvider publicApiKey={PUBLIC_API_KEY}>
      <RoomProvider
        id={PROJECT_ID}
        initialPresence={{ cursor: null, name: user?.username || "Anonymous" }}
        initialStorage={{ code: "// Start coding..." }}
      >
        <div className="bg-black min-h-screen relative">
          <div className="flex items-center justify-between w-full pt-3 pb-2 px-4">
            <Link to={"/"}>
              <h1 className="text-white text-2xl">CodeSync Editor</h1>
            </Link>
            <h1 className="text-gray-300 text-2xl font-heading font-bold">
              <Link to={"/projects"}>Project : {project?.name}</Link>
            </h1>
            <button
              className="w-24 flex items-center justify-center gap-4 bg-gray-950/70 border border-gray-400 text-white py-1 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-all duration-500 ease-in-out"
              onClick={handleCodeExecution}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
              ) : (
                <>
                  Run
                  <BiSolidRightArrow />
                </>
              )}
            </button>
          </div>
          <div className="flex w-100vw">
            <CodeEditor
              projectId={PROJECT_ID}
              onCodeChange={setCode}
              codeLanguage={language}
            />
            <div className="w-full bg-[#121212] p-2 text-gray-300 overflow-x-hidden text-wrap">
              {output ? (
                <pre className="font-body text-lg leading-7 text-wrap">
                  {output}
                </pre>
              ) : (
                <p className="font-body text-lg">
                  Output will be displayed here
                </p>
              )}
            </div>
          </div>
        </div>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Project;
