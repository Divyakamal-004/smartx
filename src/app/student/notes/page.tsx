"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface Note {
  noteslink: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/get-notes");
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen w-full ">
      <div className="flex flex-col h-full p-52 items-center gap-20">
        <div>
          <h1 className="font-bold uppercase text-4xl">Notes</h1>
        </div>
        <ol className="text-lg list-decimal">
          {notes.map((note, index) => (
            <li key={index}>
              <Button variant={"link"} className="text-zinc-200 text-lg">
                <a
                  href={note.noteslink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Notes{" " + note.id}
                </a>
              </Button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
