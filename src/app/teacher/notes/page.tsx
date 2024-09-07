"use client";

import { Button } from "@/components/ui/button";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [, setBlob] = useState<PutBlobResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col h-full w-full justify-center items-center gap-10">
        <h1 className="font-bold uppercase text-4xl">Upload Notes</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setError(null); // Reset error state

            if (!inputFileRef.current?.files?.length) {
              setError("No file selected");
              return;
            }

            const file = inputFileRef.current.files[0];

            try {
              const response = await fetch(
                `/api/save-notes?filename=${file.name}`,
                {
                  method: "POST",
                  body: file,
                }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const newBlob = (await response.json()) as PutBlobResult;

              setBlob(newBlob);
            } catch (error) {
              setError(`Failed to upload: ${error}`);
            }
          }}
        >
          <input name="file" ref={inputFileRef} type="file" required />
          <Button type="submit">Upload</Button>
        </form>

        {error && (
          <div className="text-red-500">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
