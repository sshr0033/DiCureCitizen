export const getConversations = async () => {
  const response = await fetch("http://169.224.230.28:8080/api/conversations"); 
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  return response.json();
};
