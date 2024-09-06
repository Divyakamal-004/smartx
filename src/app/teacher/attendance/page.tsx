"use client";

import generateCode from "@/api/generate-code";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {QRCodeSVG} from 'qrcode.react';

function Attendace() {
  const [code, setCode] = useState("");

  const onClickHandler = () => {
    setCode(generateCode());
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col gap-10 h-full justify-center items-center">
        <Button variant={"secondary"} onClick={onClickHandler}>Generate Code</Button>
        <QRCodeSVG value='{code}' bgColor="#000" fgColor="#fff" size={250} />
        <h2 className="text-2xl font-bold">{code}</h2>
      </div>
    </div>
  );
}

export default Attendace;
