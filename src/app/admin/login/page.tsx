import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Management() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-5 m-10  justify-center items-center ">
      <h1 className='text-3xl font-bold uppercase'>
        Admin
      </h1>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center m-center h-[70vh] ">
        <Button variant={"outline"} className='w-1/4'><Link href={"/admin/students"}>Student List</Link></Button>
        <Button variant={"outline"} className='w-1/4'><Link href={"/admin/alert"}>Emergency Alert</Link></Button>
      </div>
    </div>
  )
}

export default Management
