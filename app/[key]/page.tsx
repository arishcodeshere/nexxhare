import CodeEditor from "@/components/CodeEditor";

export default async function CodePage({ params }: { params: { key: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get?key=${params.key}`);
  const data = await res.json();
  return <CodeEditor initialCode={data.code || "No code found"} readOnly />;
}
      