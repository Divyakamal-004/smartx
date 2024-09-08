"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  //todo while auth
  const studentId = "654321";
  const onClickHandler = async () => {
    try {
      const response = await axios.post("/api/create-student", {
        //todo while auth
        name: "Ujjwal Kumar",
        studentId: parseInt(studentId),
      });
      setMessage(response.data.success || response.data.error);
      console.log(message);
    } catch (error) {
      console.log("Error logging in");
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col gap-5 m-10  justify-center items-center">
        <div>
          <h1 className="font-bold text-5xl">SMARTX</h1>
        </div>
        <div>
          <p>Smart education for the future.</p>
        </div>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center m-center h-[70vh] ">
        <Link href="/student/login" className="w-max">
          <Button
            variant={"outline"}
            className="min-w-60"
            onClick={onClickHandler}
          >
            Login as Student
          </Button>
        </Link>
        <Link href="/teacher/login" className="w-max">
          <Button variant={"outline"} className="min-w-60">
            Login as Teacher
          </Button>
        </Link>
        <Link href="/admin/login" className="w-max">
          <Button variant={"outline"} className="min-w-60">
            Login as Admin
          </Button>
        </Link>
      </div>
    </div>
  );
}
