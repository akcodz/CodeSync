import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { useResizable } from "react-resizable-layout";
import CodeEditor from "../components/CodeEditor";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BiSolidRightArrow } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import useStreamClient from "../hooks/UseStreamClient.js"
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

import { Loader2Icon, PhoneOffIcon } from "lucide-react";

const Project = () => {
  const location = useLocation();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { project } = location.state;
  const PROJECT_ID = project._id;
  const language = project.language;
  const PUBLIC_API_KEY = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_API_KEY;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(project);
  // 1. Main Horizontal Split (Sidebar vs Workspace)
  // Max set to 40% of standard screen width (~400-500px) to ensure Editor gets 60%
  const { position: sidebarWidth, separatorProps: mainDragProps } = useResizable({
    axis: "x",
    initial: 500,
    min: 200,
    max: 580, 
  });

  // 2. Left Vertical Split (Video vs Chat)
  const { position: videoHeight, separatorProps: leftDragProps } = useResizable({
    axis: "y",
    initial: 250,
    min: 150,
  });

  // 3. Right Vertical Split (Editor vs Output)
  const { position: editorHeight, separatorProps: rightDragProps } = useResizable({
    axis: "y",
    initial: 500,
    min: 200,
  });

  const handleCodeExecution = async () => {
  if (!code || !code.trim()) {
    setOutput("Please write some code before running.");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setOutput("Unauthorized. Please login again.");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URI}/projects/run-code`,
      { code, language },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setOutput(response.data.output || "No output");
  } catch (error) {
    setOutput(error.response?.data?.error || "Error running code.");
  } finally {
    setLoading(false);
  }
};

  return (
    <LiveblocksProvider publicApiKey={PUBLIC_API_KEY}>
      <RoomProvider id={PROJECT_ID} initialPresence={{ cursor: null, name: user?.username || "Anonymous" }}>
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans">
          
          {/* HEADER - Black & White */}
          <header className="h-14 flex items-center justify-between px-6 border-b border-white/20 bg-black shrink-0">
            <Link to="/" className="text-white font-black text-xl tracking-tighter uppercase">CodeSync</Link>
            <span className="text-xs font-mono text-gray-400 border border-white/20 px-3 py-1 rounded-full">
              PROJECT: {project?.name?.toUpperCase()}
            </span>
            <button
              className="flex items-center gap-2 bg-white text-black font-bold px-5 py-1.5 rounded hover:bg-gray-200 transition-all disabled:bg-gray-600"
              onClick={handleCodeExecution}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-black/20 border-t-black rounded-full" />
              ) : (
                <><BiSolidRightArrow size={10}/> RUN</>
              )}
            </button>
          </header>

          {/* MAIN CONTENT AREA */}
          <div className="flex flex-1 overflow-hidden">
            
            {/* SIDEBAR (Video + Chat) - Width limited to ensure Editor > 60% */}
            <div className="h-full bg-base-200 p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                    <p className="text-lg">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection Failed</h2>
                      <p className="text-base-content/70">Unable to connect to the video call</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>

            {/* MAIN SEPARATOR (White hover effect) */}
            <div {...mainDragProps} className="w-[1px] bg-white/10 hover:bg-white/50 cursor-col-resize transition-colors shrink-0" />

            {/* WORKSPACE (Editor + Output) */}
            <div className="flex-1 flex flex-col overflow-hidden bg-black">
              
              {/* BLOCK 3: CODE EDITOR (Takes remaining ~60-70% width) */}
              <div style={{ height: editorHeight }} className="relative overflow-hidden border-b border-white/5">
                <CodeEditor projectId={PROJECT_ID} onCodeChange={setCode} codeLanguage={language} />
              </div>

              {/* VERTICAL SEPARATOR */}
              <div {...rightDragProps} className="h-[1px] bg-white/10 hover:bg-white/40 cursor-row-resize transition-colors" />

              {/* BLOCK 4: OUTPUT */}
              <div className="flex-1 bg-black p-5 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase text-gray-500 tracking-[0.2em] font-bold">Standard_Output</span>
                  <button onClick={() => setOutput("")} className="text-[10px] text-gray-500 hover:text-white underline decoration-white/20">CLEAR_LOGS</button>
                </div>
                <div className="flex-1 font-mono text-sm text-white overflow-y-auto leading-relaxed">
                  {output ? (
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <span className="text-gray-800 select-none">_Ready for execution...</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Project;