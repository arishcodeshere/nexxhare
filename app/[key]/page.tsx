"use client"; // Force client-side rendering

import { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function CodePage({ params }: { params: { key: string } }) {
  const [code, setCode] = useState<string>("Loading...");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get?key=${params.key}`);
        const data = await res.json();
        setCode(data.code || "No code found");
      } catch (error) {
        setCode("Error loading code");
      }
    }

    fetchData();
  }, [params.key]);

  return <CodeEditor initialCode={code} readOnly />;
}
