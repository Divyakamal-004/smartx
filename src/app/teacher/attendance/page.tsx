"use client";

import generateCode from '@/api/generate-code'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'


function Attendace() {
  const [code, setCode] = useState('');

  const onClickHandler = () => {
    setCode(generateCode())
  }

  return (
    <div>
      <div>

      <Button onClick={onClickHandler}>Click me</Button>
      <p>{code}</p>
      </div>
    </div>
  )
}

export default Attendace
