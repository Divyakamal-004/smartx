"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

function VerifyAttendance() {
  const [studentId, setStudentId] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/verify-attendance", {
        studentId: parseInt(studentId),
        code: parseInt(code),
      });
      setMessage(response.data.success ||response.data.error);
    } catch (error) {
      setMessage("Error verifying attendance");
    }
  };

  return (
    <div className="verify-attendance h-full w-full">
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="text-zinc-800 p-2 w-1/4 rounded-lg"
        />
        <input
          type="text"
          placeholder="Attendance Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="text-zinc-800 w-1/4 p-2 rounded-lg"
        />
        <Button className="w-1/4" variant={"secondary"} onClick={handleSubmit}>Verify Attendance</Button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default VerifyAttendance;
