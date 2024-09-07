"use client";

import React, { useEffect, useState } from "react";

export default function History() {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("/api/fetch-chatbot-history");
        if (!response.ok) {
          throw new Error("Failed to fetch prompts");
        }
        const data = await response.json();
        setPrompts(data.prompts);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen w-full">
      <div className="flex pt-32 items-center flex-col h-full gap-10 ">
        <h1 className="text-4xl font-bold uppercase ">Prompt History</h1>
          <ol className="text-lg w-1/3 list-decimal">
            {prompts.map((prompt, index) => (
              <li key={index}>
                {prompt}
              </li>
            ))}
          </ol>
      </div>
    </div>
  );
}
