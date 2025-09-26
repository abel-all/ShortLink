import React from 'react'
import Herosection from './_components/Herosection'
import Customerssection from './_components/Customerssection'

const LangingPage = () => {
  return (
    <div className='flex flex-col gap-20'>
      <Herosection />
      <Customerssection />
    </div>
  )
}

export default LangingPage