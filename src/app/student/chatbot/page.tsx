"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Conversation {
  prompt: string;
  reply: string;
}

function GeminiChat() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch previously saved conversations on load
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/api/gemini/conversations");
        setConversation(response.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };

    fetchConversations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const response = await axios.post("/api/gemini", { message });
      const reply = response.data.reply || "No response from Gemini";

      // Add the new prompt and reply to the conversation log
      setConversation([...conversation, { prompt: message, reply }]);
      setMessage("");
      setError("");
    } catch (err) {
      setError("Failed to communicate with the chatbot.");
    }
  };

  return (
    <div className="gemini-chat h-full w-full flex flex-col-reverse gap-5 items-center">
      <div className="flex flex-col gap-5 items-center  w-[70vw] max-h-[80vh] overflow-auto p-5 border border-zinc-600 rounded-lg bg-zinc-950">
        {conversation.map((entry, index) => (
          <div key={index} className="w-full mb-4">
            {/* User's prompt */}
            <div className="flex justify-end mb-2">
              <div className="bg-zinc-700 text-white p-3 rounded-lg max-w-[80%]">
                {entry.prompt}
              </div>
            </div>
            {/* AI's reply */}
            <div className="flex justify-start">
              <div className="bg-gray-700 text-zinc-100 p-3 rounded-lg max-w-[80%]">
                {entry.reply}
              </div>
            </div>
          </div>
        ))}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>

      {/* Input field for user to type message */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-5 justify-center items-end mt-10 w-[70vw]"
      >
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full"
        />
        <Button type="submit" variant="secondary">
          Ask Chatbot
        </Button>
      </form>
    </div>
  );
}

export default GeminiChat;
