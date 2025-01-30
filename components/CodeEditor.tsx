"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ initialCode = "", readOnly = false }: { initialCode?: string; readOnly?: boolean }) {
  const [code, setCode] = useState(initialCode);

  return (
    <div className="editor-container">
      <Editor height="60vh" language="javascript" theme="vs-dark" value={code} onChange={(value) => setCode(value || "")} options={{ readOnly }} />
      <div className="actions">
        <button onClick={() => navigator.clipboard.writeText(code)}>Copy All</button>
        <button onClick={() => setCode("")}>Remove All</button>
      </div>
    </div>
  );
}