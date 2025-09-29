import React from 'react'
import Herosection from './_components/Herosection'
import Customerssection from './_components/Customerssection'
import Pricing from './_components/Pricing'

const LangingPage = () => {
  return (
    <div className='flex flex-col gap-20 mt-[4.625rem]'>
      <Herosection />
      <Customerssection />
      <Pricing />
    </div>
  )
}

export default LangingPage