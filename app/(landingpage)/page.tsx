import React from 'react'
import Herosection from './_components/Herosection'
import Customerssection from './_components/Customerssection'
import Pricing from './_components/Pricing'
import PublicStatistics from './_components/PublicStatistics'

const LangingPage = () => {
  return (
    <div className='flex flex-col gap-20'>
      <Herosection />
      <PublicStatistics />
      <Customerssection />
      <Pricing />
    </div>
  )
}

export default LangingPage