"use client";
import { useState } from "react";
import { saveCode } from "@/utils/api";

export default function Home() {
  const [key, setKey] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!key || !code) {
      setMessage("Please enter both key and code.");
      return;
    }
    const response = await saveCode(key, code);
    setMessage(response.message || "Error saving code.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-gray-900">CodeShare</h1>

      {/* Code Container */}
      <div className="w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow-xl border border-gray-300">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
          className="w-full h-64 p-4 text-white bg-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter unique key"
          className="w-full mt-4 p-3 text-black bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Save Code
        </button>

        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
}