"use client";

import generateCode from "@/app/api/generate-code/generate-code";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

function Attendance() {
  const [codeData, setCodeData] = useState<{
    code: string;
    timestamp: number;
  } | null>(null);


  const onClickHandler = async () => {
    const generatedCode = generateCode();
    setCodeData(generatedCode);

    try {
      // Send generated code to the server
      await axios.post("/api/save-attendance", {
        code: generatedCode.code,
        expiryTime: 120,
      });
    } catch (error) {
      console.error("Error saving code", error);
    }
  };

  const isCodeValid = () => {
    if (!codeData) return false;
    const currentTime = Date.now();
    const elapsedTime = (currentTime - codeData.timestamp) / 1000;
    return elapsedTime <= 120; // Code is valid for 120 seconds (2 minutes)
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (codeData && !isCodeValid()) {
        setCodeData(null); // Expire the code after 2 minutes
      }
    }, 1000); // Check every second for code expiration

    return () => clearInterval(interval);
  }, [codeData]);

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col gap-5 h-full justify-center items-center">
        <Button className="p-5" onClick={onClickHandler}>Generate Code</Button>
        {codeData && isCodeValid() ? (
          <>
            <h2 className="text-2xl font-bold">{codeData.code}</h2>
            <QRCodeSVG
              value={codeData.code}
              bgColor="#000"
              fgColor="#fff"
              size={250}
            />
          </>
        ) : (
          <h2>Code expired or not generated</h2>
        )}
      </div>
    </div>
  );
}

export default Attendance;
