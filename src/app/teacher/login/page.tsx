import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Teacher() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-5 m-10 text-5xl uppercase font-bold justify-center items-center">
      Teacher 
      </div>
      <div className="flex flex-col gap-5 justify-center items-center m-center h-[70vh] ">
        <Button variant={"outline"}><Link href={"/teacher/attendance"}>Attendace</Link></Button>
        <Button variant={"outline"}><Link href={"/teacher/notes"}>Share Notes</Link></Button>
        <Button variant={"outline"}><Link href={"/teacher/history"}>Student Chatbot History</Link></Button>
      </div>
    </div>
  )
}

export default Teacher
