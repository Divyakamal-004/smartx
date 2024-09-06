"use client"

import { useState } from "react";
import axios from "axios";

function VerifyAttendance() {
  const [studentId, setStudentId] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/verify-attendance', {
        studentId: parseInt(studentId),
        code: parseInt(code),
      });

      setMessage(response.data.success || response.data.error);
    } catch (error) {
      setMessage("Error verifying attendance");
    }
  };

  return (
    <div className="verify-attendance">
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="text-zinc-800"
        />
      <input
        type="text"
        placeholder="Attendance Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="text-zinc-800"
      />
      <button onClick={handleSubmit}>Verify Attendance</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VerifyAttendance;
