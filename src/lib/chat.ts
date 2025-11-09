import { Tables } from "@/integrations/supabase/types";

export async function sendChat(message: string, profile: Tables<"profiles">) {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, profile }),
  });

  const data = await res.json();
  return data.reply; // ✅ return the actual chatbot response
}
