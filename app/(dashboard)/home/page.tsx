'use client'

import useUser from '@/context/UserContext'
import React from 'react'

const page = () => {
  
  const { firstName } = useUser();

  return (
    <div>Hello {firstName}</div>
  )
}

export default page