const API_URL = import.meta.env.VITE_API_URL;



export const getConversations = async () => {
  console.log("API URL:", API_URL);  
  const response = await fetch(`${API_URL}/api/conversations`);
  if (!response.ok) throw new Error("Failed to fetch conversations");
  return response.json();
};

export async function predictText(text: string) {
  const res = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}
export interface PredictResponse {
  probability: number;     
  message?: string;       
}
