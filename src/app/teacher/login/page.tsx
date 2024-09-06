import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Teacher() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-5 m-10  justify-center items-center">
      Student
      </div>
      <div className="flex flex-col gap-5 justify-center items-center m-center h-[70vh] ">
        <Button><Link href={"/teacher/attendance"}>Attendace</Link></Button>
        <Button>Routine</Button>
        <Button>Notes Share</Button>
      </div>
    </div>
  )
}

export default Teacher
