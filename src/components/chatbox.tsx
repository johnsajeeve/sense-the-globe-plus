import { useState, useRef, useEffect } from "react";
import { sendChat } from "../lib/chat";
import type { Tables } from "@/integrations/supabase/types";

export function ChatBox({ profile }: { profile: Tables<"profiles"> }) {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    const reply = await sendChat(userMessage, profile);

    setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-lg bg-white">

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-xl ${
              m.sender === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
            }`}
          >
            {m.text}
          </div>
        ))}

        {isTyping && (
          <div className="mr-auto bg-gray-200 text-gray-900 px-4 py-2 rounded-xl animate-pulse">
            typing...
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div className="flex border-t border-gray-300 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
