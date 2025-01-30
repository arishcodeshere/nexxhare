const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function saveCode(key: string, code: string) {
  const response = await fetch(`${BASE_URL}/api/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, code }),
  });
  return response.json();
}

export async function getCode(key: string) {
  const response = await fetch(`${BASE_URL}/api/get?key=${key}`);
  return response.json();
}

export async function deleteCode(key: string) {
  const response = await fetch(`${BASE_URL}/api/delete?key=${key}`, { method: "DELETE" });
  return response.json();
}