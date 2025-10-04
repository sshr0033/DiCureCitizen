const API_URL = import.meta.env.VITE_API_URL;

export const getConversations = async () => {
  console.log("API URL:", API_URL);  
  const response = await fetch(`${API_URL}/api/conversations`);
  if (!response.ok) throw new Error("Failed to fetch conversations");
  return response.json();
};
