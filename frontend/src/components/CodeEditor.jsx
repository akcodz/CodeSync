import { useEffect, useState, useCallback, useRef } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useMyPresence, useOthers } from "@liveblocks/react";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import axios from "axios";

const SAVE_INTERVAL = 5000; // Define the save interval as a constant

const CodeEditor = ({ projectId, onCodeChange, codeLanguage }) => {
  const [editorRef, setEditorRef] = useState(null);
  const lastSavedCode = useRef(""); // Using useRef instead of useState for lastSavedCode
  const room = useRoom();
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();
  const [isInitialized, setIsInitialized] = useState(false);

  const handleCursorMove = useCallback(() => {
    if (!editorRef) return;
    const position = editorRef.getPosition();
    if (position) {
      updateMyPresence({ cursor: position });
    }
  }, [editorRef, updateMyPresence]);

  const fetchCode = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/projects/get-code/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && editorRef) {
        editorRef.setValue(response.data.code);
        lastSavedCode.current = response.data.code; // Update lastSavedCode.current
        if (onCodeChange) { // Only call onCodeChange if it's a function
          onCodeChange(response.data.code);
        }
      }
    } catch (error) {
      console.error("Error fetching code:", error.response?.data || error.message);
      // Consider showing a user-facing error message
    }
  }, [editorRef, projectId, onCodeChange]);

  useEffect(() => {
    if (editorRef && projectId) {
      fetchCode();
    }
  }, [editorRef, projectId, fetchCode]); // Added fetchCode to dependency array

  const saveCode = useCallback(() => {
    if (!editorRef) {
      return;
    }

    const currentCode = editorRef.getValue();
    onCodeChange(currentCode);

    if (currentCode !== lastSavedCode.current) { // Compare with lastSavedCode.current

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      axios
        .post(
          `${import.meta.env.VITE_BASE_URI}/projects/save-code/${projectId}`,
          { projectId, code: currentCode, language: codeLanguage },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          lastSavedCode.current = currentCode; // Update lastSavedCode.current
        })
        .catch((err) => console.error("❌ Error saving code:", err.response?.data || err.message));
    } else {
    }
  }, [editorRef, lastSavedCode, projectId, codeLanguage, onCodeChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveCode();
    }, SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [saveCode]);

  useEffect(() => {
    if (!editorRef) return;

    const yDoc = new Y.Doc();
    const yText = yDoc.getText("monaco");
    const yProvider = new LiveblocksYjsProvider(room, yDoc, {
      documentId: projectId,
    });
    const awareness = yProvider.awareness;

    const model = editorRef.getModel();
    if (!model) return;

    const binding = new MonacoBinding(yText, model, new Set([editorRef]), awareness);

    editorRef.onDidChangeCursorPosition(handleCursorMove);
    setIsInitialized(true); // Set initialization flag

    return () => {
      yDoc.destroy();
      yProvider.destroy();
      binding.destroy();
    };
  }, [editorRef, room, handleCursorMove, projectId]);

    useEffect(() => {
        return () => {
            if (!isInitialized) return;
            console.log('Destroying binding...');
        };
    }, [isInitialized]);

  const handleOnMount = useCallback((editorInstance) => {
    setEditorRef(editorInstance);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Editor
        onMount={handleOnMount}
        height="100vh"
        width="70vw"
        theme="vs-dark"
        defaultLanguage={codeLanguage}
        defaultValue="// Start coding..."
        options={{ tabSize: 2 }}
      />

      {others.map(({ connectionId, presence }) =>
        presence?.cursor ? (
          <div
            key={connectionId}
            className="absolute text-xs font-bold p-1 rounded bg-blue-600 text-white"
            style={{
              left: `${presence.cursor.column * 8}px`,
              top: `${presence.cursor.lineNumber * 20}px`,
            }}
          >
            {presence.name || "User"} 👆
          </div>
        ) : null
      )}
    </div>
  );
};

export default CodeEditor;