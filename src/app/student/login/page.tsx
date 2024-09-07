import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Teacher() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-5 m-10 text-5xl uppercase font-bold justify-center items-center">
      Student
      </div>
      <div className="flex flex-col gap-5 justify-center items-center m-center h-[70vh] ">
        <Button variant={"outline"}><Link href={"/student/attendance"}>Attendance</Link></Button>
        <Button variant={"outline"}>Routine</Button>
        <Button variant={"outline"}>Notes Share</Button>
      </div>
    </div>
  )
}

export default Teacher
