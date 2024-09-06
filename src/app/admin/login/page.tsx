import { Button } from '@/components/ui/button'
import React from 'react'

function Management() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-5 m-10  justify-center items-center">
      Student
      </div>
      <div className="flex flex-col gap-5 justify-center items-center m-center h-[70vh] ">
        <Button>Attendace</Button>
        <Button>Student Database</Button>
        <Button>Emergency Alert</Button>
        
      </div>
    </div>
  )
}

export default Management
