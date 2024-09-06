"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function Student() {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Verification code sent successfully!");
      } else {
        // Handle error response
        console.error("Failed to send verification code.");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  };

  return (
    <div className="h-screen w-full">
      <div className='flex flex-col justify-center items-center h-full'>
        <form onSubmit={handleSubmit} className="flex flex-col ">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="text-zinc-800 text-center"
              placeholder="Enter verification code"
            />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default Student;
